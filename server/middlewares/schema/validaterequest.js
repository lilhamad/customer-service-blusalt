import Response from '../../utils/response';
const Joi = require('joi'); 
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true // remove unknown props
};


export const validateTransaction = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, options);
    // req.body = body;
    next();
  } catch (error) {
    return Response.error(res, 422, error.message);
  }
  return null;
};
export const validateOtherRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, options);
    // req.body = body;
    next();
  } catch (error) {
    return Response.error(res, 422, error.message);
  }
  return null;
};

export const validateTransactionEncrypted = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, options);
    // req.body = body;
    next();
  } catch (error) {
    let data = { status: false, message: error.message,  errorCode: 'md211', code:422  };
    const encryptedData = req.clientCypher.encrypt(JSON.stringify(data));
    return res.status(422).send(encryptedData);
    // return Response.error(res, 422, error.message);
  }
  return null;
};

export const validatecsvTransaction = (schema) => async (req) => {
  try {
    await schema.validateAsync(req);
    // req.body = body;
    next();
  } catch (error) {
    return Response.error(res, 422, error.message);
  }
  return null;
};


// export default { validateTransaction, validateTransactionEncrypted };
