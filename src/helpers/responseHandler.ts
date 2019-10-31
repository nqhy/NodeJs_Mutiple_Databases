import { Response } from 'express';
import { Error } from 'mongoose';

import HandleErrors from './handleErrors';

export interface ErrorResponse {
  name: string;
  _message: string;
  message: string;
  errors?: Error;
}

export interface Config {
  code?: string;
  description?: string;
  message?: string;
  context?: any;
}

export default class ResponseHandler {
  static returnSuccess(res: Response, data: any) {
    return res.status(200).json({
      isSuccess: true,
      data,
    });
  }

  static returnError({
    res,
    error = {
      _message: undefined,
      name: undefined,
      message: undefined,
    },
    config = {},
  }: {
    res: Response;
    error?: ErrorResponse;
    config?: Config;
  }) {
    const {
      code,
      message: configMessage,
      description,
      context: configContext,
    } = config;
    const { _message: shortMessage, message, errors, name } = error;
    const handleErrors = new HandleErrors(errors);

    const context = handleErrors.processContext();

    if (configContext) context.push(configContext);

    return res.status(400).json({
      isSuccess: false,
      code,
      name,
      message: message || configMessage,
      context,
      shortMessage,
      description,
    });
  }
}
