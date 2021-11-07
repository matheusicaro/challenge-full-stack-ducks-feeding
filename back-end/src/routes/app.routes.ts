import { Router } from 'express';

import { HealthController, AnimalFeedingController, UserController } from '../api/controllers';

const router = Router();

router.get('/health', HealthController.getHealth);

router.get('/animals/feeding', AnimalFeedingController.getFeeding);
router.post('/animals/feeding', AnimalFeedingController.saveAnimalFeeding);

router.post('/user/singup', UserController.singup);

export default router;
