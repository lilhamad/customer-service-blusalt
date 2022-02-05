export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  
  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = true;
  }
  
  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = false;
    this.data = null;
  }
  
  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };
    
    if (this.type === true) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
  
  sendWithEncryption(req, res) {
    try{
      const result = {
        status: this.type,
        message: this.message,
      };
      if(this.type){
        result.data = this.data;
      }
      result.responseTime = new Date();
      const encryptedData = req.clientCypher.encrypt(JSON.stringify(result));
      return res.status(this.statusCode).send(encryptedData);
    }
    catch(error){
      console.log("sendWithEncryption catch error", JSON.stringify(error));
      return res.status(500).json({
        status: 'error',
        message: "encryption error",
      });
    }
  }
  
}