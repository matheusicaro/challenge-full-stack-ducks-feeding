import { Router } from 'express';

import { HealthController, AnimalFeedingController, UserController } from '../api/controllers';
import Middleware from '../api/middlewares';

const router = Router();

router.get('/health', HealthController.getHealth);

router.get('/animals/feeding', AnimalFeedingController.getFeeding);
router.post('/animals/feeding', Middleware.verifyAuthentication, AnimalFeedingController.saveAnimalFeeding);

router.post('/user/singup', UserController.singup);
router.post('/user/login', UserController.getAuthToken);

export default router;
