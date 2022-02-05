import joi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = joi.extend(JoiDate);

export const verifyTransactionSchema = Joi.array().items(Joi.object().keys({ 
  Request_ID: Joi.string().required(),
  // Request_ID: Joi.string().min(9).required(),
  MerchantNet: Joi.string().trim().required(),
  Auth_Curr: Joi.string().trim().valid('566', '840').required(),
  settlementCurr: Joi.string().trim().valid('566', '840').required(),
  AcquirerFees: Joi.string().trim().required(),
  Auth_Amt: Joi.string().trim().required(),
  TT_Auth_Amt: Joi.string().trim().required(),
  Action_Code: Joi.string().trim().required(),
  MCH_Name: Joi.string().trim().required(),
})) 

