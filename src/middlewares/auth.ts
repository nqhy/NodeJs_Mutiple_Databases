import * as jwt from 'jsonwebtoken';

import {
  RequestMethod,
  defaultAllowMethods,
  ErrorCode,
  defaultAllowRoutes,
  NotFound,
} from '../constants';
import { responseHandler } from '../helpers';
import { userRepository } from '../repositories';
import '../helpers/env';
import { OptionsBase } from '../repositories';

interface AuthMiddlewareParams {
  allowRoutes: Array<string>;
  allowMethods: Array<RequestMethod>;
}

export default class AuthMiddleware {
  private static instance: AuthMiddleware;

  private allowRoutes: Array<string>;
  private allowMethods: Array<RequestMethod>;

  constructor() {}

  static getInstance(config?: AuthMiddlewareParams) {
    let configuration: any = {};
    if (config) configuration = config;

    const {
      allowRoutes = defaultAllowRoutes,
      allowMethods = defaultAllowMethods,
    } = configuration;
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
      AuthMiddleware.instance.allowRoutes = allowRoutes;
      AuthMiddleware.instance.allowMethods = allowMethods;
    }
    return AuthMiddleware.instance;
  }

  async checkAuth(req, res, next) {
    const { allowRoutes, allowMethods } = AuthMiddleware.instance;
    const { method, url }: { method: RequestMethod; url: string } = req;
    if (allowMethods.indexOf(method) > -1 || allowRoutes.indexOf(url) > -1)
      return next();
    const user = await AuthMiddleware.instance.requireAuth(req, res);
    req.user = user;
    next();
  }

  async requireAuth(req, res) {
    const token = req.headers.authorization;

    if (!token)
      return responseHandler.returnError({
        res,
        config: {
          code: ErrorCode['1003'].code,
          message: 'Not Found Authentication',
          description: ErrorCode['1003'].description,
        },
      });
    const tokens = token.split('Bearer ');
    if (tokens.length !== 2 || tokens[0] !== '') {
      return responseHandler.returnError({
        res,
        config: {
          code: ErrorCode['1004'].code,
          message: 'Not Found Authentication Format',
          description: ErrorCode['1004'].description,
        },
      });
    }
    try {
      const data = await jwt.verify(tokens[1], process.env.KEY_JWT);

      const options: OptionsBase = {
        where: { _id: (data as any)._id },
        select: '_id email fullName role',
        lean: true,
      };

      const user = await userRepository.get(options);
      if (!user)
        return responseHandler.returnError({
          res,
          config: NotFound,
        });

      return user;
    } catch (error) {
      return responseHandler.returnError({
        res,
        error,
      });
    }
  }
}
