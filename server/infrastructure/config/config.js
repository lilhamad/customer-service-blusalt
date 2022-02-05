import path from 'path';
// const path = require("path");
import { config } from 'dotenv';
// const env = require("dotenv")

config();
const dialect = process.env.DIALECT || 'mysql';
module.exports = {
  development: {
    url: process.env.DB_URL || '',
    dialect,
    logging: (e) => {
      console.log(e);
    },
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database_test.sqlite3'),
    logging: (e) => {
      console.log(e);
    },
  },
  production: {
    url: process.env.DB_URL || '',
    logging: false,
    pool: {
      acquire: 1000000,
    }
  },
};