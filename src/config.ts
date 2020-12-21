import * as dotenv from 'dotenv';
dotenv.config();
const { MONGO_URL, MONGO_TESTURL, NODE_ENV, SECRET_KEY,SALT_KEY } = process.env;

export const Config ={
    MONGO_URL, MONGO_TESTURL, NODE_ENV, SECRET_KEY,SALT_KEY 

  }