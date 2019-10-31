import * as joi from 'joi';

export default class SampleValidation {
  static test() {
    return {
      body: {
        test: joi.string(),
      },
    };
  }
}
