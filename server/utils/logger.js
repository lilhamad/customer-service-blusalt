const util = require('util');
const fs = require('fs');
let moment = require('moment');
const fileName = moment().format('MM-DD-YYYY');
export const logString = (string) => {
    var log_file_err = fs.createWriteStream(__dirname + '@/../error.log', { flags: 'a' });
    log_file_err.write(util.format("\n",string));
}

const nowTime = moment().format('h:mm:ss a');

export const stringLogger = (string) => {
    try{
        var log_file_err = fs.createWriteStream(__dirname + '@/../../Logg/'+fileName+'-TransactionsAuditLog', { flags: 'a' });
        // log_file_err.write(util.format("\n",string));
        log_file_err.write(util.format("\n",nowTime, string));

    }
    catch (error) {
        console.log("Logging error: " + error);
    }
}

export const stringLoggerTransaction = (string) => {
    try{
        var log_file_err = fs.createWriteStream(__dirname + '@/../../Logg/'+fileName+'-TransactionsAuditLog', { flags: 'a' });
        log_file_err.write(util.format("\n",moment().format('h:mm:ss a'), string));

    }
    catch (error) {
        console.log("Logging error: " + error);
    }
}

export const stringLoggerCredit = (string) => {
    try{
        var log_file_err = fs.createWriteStream(__dirname + '@/../../Logg/'+fileName+'-CreditingAuditLog', { flags: 'a' });
        log_file_err.write(util.format("\n",moment().format('h:mm:ss a'), string));

        // log_file_err.write(util.format("\n",string));
    }
    catch (error) {
        console.log("Logging error: " + error);
    }
}

export const stringLoggerExternal = (string) => {
    try{
        // console.log(string);
        var log_file_err = fs.createWriteStream(__dirname + '@/../../Logg/'+fileName+'-ExternalPSSPAuditLog', { flags: 'a' });
        
        log_file_err.write(util.format("\n",moment().format('h:mm:ss a'), string));
        // console.log("\n",moment().format('h:mm:ss a'), string);
    }
    catch (error) {
        console.log("Logging error: " + error);
    }
}

export const stringLoggerAuth = (string) => {
    try{
        // console.log(string);
        var log_file_err = fs.createWriteStream(__dirname + '@/../../Logg/'+fileName+'-Auth', { flags: 'a' });
        
        log_file_err.write(util.format("\n",moment().format('h:mm:ss a'), string));
        // console.log("\n",moment().format('h:mm:ss a'), string);
    }
    catch (error) {
        console.log("Logging error: " + error);
    }
}
