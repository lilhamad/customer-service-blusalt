import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import './config';
import { Response } from '@utilities';
import customerRoutes from './routes/customerRoutes';
const fileUpload = require('express-fileupload');
var cron = require('node-cron');
import customerController from './controllers/customerController';


const PORT = process.env.PORT || 2000;
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
app.set('trust proxy', true);
// MIDDLEWARES
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  return Response.success(
    res, 200, 'I am alive at this port', PORT )
  });
  app.use('/api/v1/cust', customerRoutes);
  
  
  app.listen(PORT, () => {
    console.log(`Server running, ${PORT}`);
  });
  
  cron.schedule('* * * * *', async() => {
    await customerController.fundAccount();
  });
    
  export default app;
