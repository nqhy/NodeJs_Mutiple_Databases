import ErrorCode from './ErrorCode';

export const BadRequest = {
  code: ErrorCode['1002'].code,
  message: 'Bad Request',
  description: ErrorCode['1002'].description,
};

export const NotFound = {
  code: ErrorCode['1001'].code,
  message: 'Not Found',
  description: ErrorCode['1001'].description,
};

export const NotHavePermission = {
  code: ErrorCode['1005'].code,
  message: 'Do Not Have Permission',
  description: ErrorCode['1005'].description,
};

export const CreateFailure = {
  code: ErrorCode['1006'].code,
  message: 'Can not create',
  description: ErrorCode['1006'].description,
};
