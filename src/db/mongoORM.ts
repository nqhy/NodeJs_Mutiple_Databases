import * as mongoose from 'mongoose';

import '../helpers/env';
import logger from '../utils/logger';
import { mongoConfig } from './config';

export default class MongoORM {
  static async connect() {
    try {
      await mongoose.connect(mongoConfig.mongoURL, {
        useNewUrlParser: true,
      });
      logger({ type: 'Notify', message: 'Connected To Mongo' });
    } catch (err) {
      logger({ type: 'Error', message: `Fail To Connect To Mongo ${err}` });
    }
  }
}
