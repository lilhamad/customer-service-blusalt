/* eslint-disable max-len */
import amqp from 'amqplib/callback_api';
import moment from 'moment';
import '@config';
import { stringLogger, stringLoggerTransaction, stringLoggerExternal } from './logger';
import TransactionService from "../services/TransactionService";
import otherMerchantService from "../services/otherMerchantService";
import database from "../infrastructure/models";


const AMQP = process.env.RABBITMQURL || 'localhost'
const transactionQueueName = process.env.transactionQueueName || 'transactionsQueue';

class Queue {
  static async sendToQueue(transactions) {
    try {
      return new Promise(async(resolve, reject) => { 
        amqp.connect(`amqp://${AMQP}`, (err, connection) => {
        if (err) {
          console.log(`\nFAILED TO CONNECT TO RABBIT MQ TO SEND DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`+ err);
          stringLoggerTransaction(`\nFAILED TO CONNECT TO RABBIT MQ TO SEND DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`+ err);
        } else {
          console.log('connected successfully to AMQP');
          let trans = [];
          let status = false;
          connection.createChannel(async (err1, channel) => {
            if (err1) {
              console.error(err1);
              reject(err1)
            } else {
              channel.assertQueue(AMQP, {
                durable: true,
              });
            }
            const freq = {
              daily: 'days',
              weekly: 'weeks',
              monthly: 'months',
            };
            // Format and send to queue
            // const sendTransactions = async () => {
            try {
              if (transactions.length === 0) return;
              transactions.forEach(async (transaction) => {
                channel.sendToQueue(transactionQueueName, Buffer.from(JSON.stringify(transaction)), {
                  persistent: true,
                  contentType: 'application/json',
                });
                let isSaveIsSentToQueue =  await database.settlementTransaction.update({isSentToQueue: true }, { where: { id: Number(transaction.id) } });
                // console.log("isSaveIsSentToQueue from Queue " + isSaveIsSentToQueue);
              });
              // console.log(`${transactions?transactions.length:'unk'} Transactions sent to queue on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
              stringLoggerTransaction(`${transactions?transactions.length:'unk'} Transactions sent to queue on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
              // trans = transactions;
              channel.close(() => connection.close());
              resolve(transactions);
            } catch (error) {
              console.log("ERROR UPDATING ISSENT TO QUEUE MSG "+ JSON.stringify(error) + JSON.stringify(error.message));
              stringLoggerTransaction("ERROR UPDATING ISSENT TO QUEUE MSG "+ JSON.stringify(error) + JSON.stringify(error.message));
              
              status = false;
              console.error(error.message);
              channel.close(() => connection.close());
              reject(error)
            } 
          });
        }
      });
    });
  } catch (error) {
    console.log(`\nERROR WHILE CONNECT TO RABBIT MQ TO SEND DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}` + error);
    stringLoggerTransaction(`\nERROR WHILE CONNECT TO RABBIT MQ TO SEND DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}` + error);
    
  }
}
static async retrieveFromQueue() {
  try {
    amqp.connect(`amqp://${AMQP}`, (err, connection) => {
    if (err) {
      console.log(`\nFAILED TO CONNECT TO RABBIT MQ TO FETCH DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`+ err);
      stringLoggerTransaction(`\nFAILED TO CONNECT TO RABBIT MQ TO FETCH DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`+ err);
    } else {
      connection.createChannel(async (err1, channel) => {
        if (err1) {
          console.log("err1 ampq :", err1);
        } else {
          channel.assertQueue(transactionQueueName, {
            durable: true,
          });
          channel.prefetch(1);
          channel.consume(transactionQueueName, async (data) => {
            let dataNew = JSON.parse(data.content);
            let secs = Number(dataNew.id) % 10;
            secs = secs + 1;
            // console.log("\n\n\n SECS ", secs);
            setTimeout(async function(){
              const processedTransaction = await TransactionService.seperateATransaction(dataNew);
              channel.ack(data);
            }, 500);
            // },secs * 200);
          });
        }
      });
    }
  });
  
} catch (error) {
  console.log(error);
  stringLoggerTransaction(`\nERROR WHILE CONNECT TO RABBIT MQ TO SEND DATA TO QUEUE ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}` + error);
}
}

static UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

}

export default Queue;
