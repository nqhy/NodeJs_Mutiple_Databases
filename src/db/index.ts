import * as mongoose from 'mongoose';

import '../helpers/env';
import logger from '../utils/logger';
import config from './config';

export default (async () => {
  try {
    await mongoose.connect(config.mongoURL, {
      useNewUrlParser: true,
    });
    logger({ type: 'Notify', message: 'Connected To Mongo' });
  } catch (err) {
    logger({ type: 'Error', message: `Fail To Connect To Mongo ${err}` });
  }
})();
