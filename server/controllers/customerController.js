import customerService from "../services/customerService";
let moment = require('moment');


class customerController {
  static async retrievcustomersFromDbAndSeperate() {
    try {
    } catch (error) {
      console.log("Error Queue ret non sep and sep " + error);
    }
  }  
  
  static async fundAccount() {
    try {
      const request = await customerService.fundAccount(1);
      if (request.status) {
        console.log("Request sent");
      } else {
        console.log("Error sending request", request.message);
      }
    } catch (error) {
      console.log("Error sending request" + error);
    }
  }
}


export default customerController;
