import database from "../infrastructure/models";
import axiosCall from '../utils/axioscall';

require('dotenv').config();

class customerService {

    
  static async fundAccount(id) {
    try {
      const result = await axiosCall({
        url: process.env.BILLING_SERVICE_URL,
        method: 'post',
        data: {customerId: id, amount: 100}
      });
      if (result.error) {
        return { status: false, message : JSON.stringify(result)}
      }else{
        return { status: true, data: result};
      } 
    } catch (error) {
      console.log("Request error" + JSON.stringify(error));
      return { status: false, message : JSON.stringify(error)}
    }
  }
}
    export default customerService;
