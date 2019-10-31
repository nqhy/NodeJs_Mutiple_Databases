import Redis from '../services/redis';

import { responseHandler } from '../helpers';
import { ErrorCode } from '../constants';

export default class RedisMiddleware {
  static async cache(req, res, next) {
    const {
      params: { id },
    } = req;

    const redisClient = Redis.getInstance().client;
    redisClient.get(id, (error, data) => {
      if (error)
        return responseHandler.returnError({
          res,
          error,
          config: {
            code: ErrorCode['1007'].code,
            message: 'Redis Get Key Failure',
            description: ErrorCode['1007'].description,
          },
        });

      if (data !== null) return responseHandler.returnSuccess(res, data);
      next();
    });
  }
}
