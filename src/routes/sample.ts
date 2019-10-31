import * as validation from 'express-validation';

import App from '../App';
import { sampleController } from '../controllers';
import { sampleMiddleware } from '../middlewares';
import { sampleValidation } from '../validations';

const router = App.router;

router.get(
  '/',
  validation(sampleValidation.test()),
  sampleMiddleware.test,
  sampleController.test,
);

export default router;
