import { Router } from 'express';

import { HealthController, AnimalFeedingController } from '../api/controllers';

const router = Router();

router.get('/health', HealthController.getHealth);

router.get('/animals/feeding', AnimalFeedingController.getFeeding);
router.post('/animals/feeding', AnimalFeedingController.saveAnimalFeeding);

export default router;
