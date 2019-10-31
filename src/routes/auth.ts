import App from '../App';
import { authController } from '../controllers';

const router = App.router;

router.post('/signup', authController.create);
router.post('/login', authController.login);
router.post('/logins', authController.login);

export default router;
