import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { userRepository } from '../repositories';
import { responseHandler } from '../helpers';
import { OptionsBase } from '../repositories/types';
import '../helpers/env';
import {
  saltRounds,
  ErrorCode,
  NotFound,
  CreateFailure,
  BadRequest,
} from '../constants';

export default class AuthController {
  static async create(req, res, next) {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      const data = { ...req.body, password: hashPassword };

      const user = userRepository.create(data);
      await user.save();
      delete user._doc.password;

      responseHandler.returnSuccess(res, user);
    } catch (error) {
      return responseHandler.returnError({
        res,
        error,
        config: BadRequest,
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const options: OptionsBase = {
        where: { email },
        lean: true,
      };

      const user = await userRepository.get(options);
      if (!user) {
        return responseHandler.returnError({
          res,
          config: NotFound,
        });
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return responseHandler.returnError({
          res,
          config: {
            code: ErrorCode['1002'].code,
            message: 'Password is not correct',
            description: ErrorCode['1002'].description,
            context: {
              field: 'password',
              message: 'Password is not correct',
            },
          },
        });
      }

      delete user.password;

      const token = await jwt.sign(user, process.env.KEY_JWT);

      responseHandler.returnSuccess(res, { user, token });
    } catch (error) {
      return responseHandler.returnError({ res, error });
    }
  }
}
