import { Cypher } from '../utils/cypher';

class Response {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.statusCode = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(payload) {
    return this.res.status(this.statusCode).json(payload);
  }

  encryptAndSend(payload) {
    // console.log("cred ",this.res);
    // console.log("ata.aesKey, data.ivKey ",res.aesKey, data.ivKey);
    const encrypted = this.req.clientCypher.encrypt(JSON.stringify(payload));
    return this.res.status(this.statusCode).send(encrypted);
  }
}
export default Response;
