interface ErrorCodeParams {
  code: number;
  description: string;
}

interface ErrorCode {
  [key: number]: ErrorCodeParams;
}

const errorCode: ErrorCode = {
  1001: {
    code: 1001,
    description: 'Not Found',
  },
  1002: {
    code: 1002,
    description: 'Bad Request',
  },
  1003: {
    code: 1003,
    description: 'Not Found Authentication',
  },
  1004: {
    code: 1004,
    description: 'Not Found Authentication Format',
  },
  1005: {
    code: 1005,
    description: 'Not Have Permission',
  },
  1006: {
    code: 1006,
    description: 'Create Failure',
  },
  1007: {
    code: 1007,
    description: 'Redis Failure',
  },
};

export default errorCode;
