import { createConnection } from 'typeorm';

import { mysqlConfig } from './config';
import logger from '../utils/logger';
import '../helpers/env';

export default class MysqlORM {
  static async connect() {
    try {
      const connection = await createConnection(
        mysqlConfig[process.env.NODE_ENV || 'development'],
      );
      logger({ type: 'Notify', message: 'Connected To MySQL' });
    } catch (err) {
      logger({ type: 'Error', message: `Fail To Connect To MySQL ${err}` });
    }
  }
}
