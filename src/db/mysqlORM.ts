import { createConnection } from 'typeorm';

import { mysqlConfig } from './config';
import logger from '../utils/logger';

export default class MysqlORM {
  static async connect() {
    try {
      await createConnection(mysqlConfig);
      logger({ type: 'Notify', message: 'Connected To MySQL' });
    } catch (err) {
      logger({ type: 'Error', message: `Fail To Connect To MySQL ${err}` });
    }
  }
}
