type NameError = 'ValidatorError';

interface ErrorProperties {
  name?: NameError;
  path: string;
  message: string;
}

interface ErrorsResponse {
  [key: string]: ErrorProperties;
}

export default class HandleErrors {
  private errors: ErrorsResponse;
  private context: Array<ErrorProperties>;

  constructor(errors) {
    this.errors = errors;
    this.context = [];
  }

  handleValidationErrors(error: ErrorProperties) {
    const { path, message } = error;
    this.context.push({ path, message });
  }

  checkTypeError() {
    for (let key in this.errors) {
      const value = this.errors[key];
      if (value.name === 'ValidatorError') this.handleValidationErrors(value);
    }
  }

  processContext() {
    this.checkTypeError();
    return this.context;
  }
}
