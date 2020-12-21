import mongoose from 'mongoose';
import { Config } from './config';

export const connect = async () => {
  try {
    await mongoose.connect(`${Config.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('mongo database error', error);
  }
};

export const testConnect = async () => {
  await mongoose.connect(`${Config.MONGO_TESTURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};