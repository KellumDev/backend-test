import { Router } from 'express';
import { LocationController } from '/code/controllers/location.controller.js';

const router = Router();
const locationController = new LocationController();

router.get('/bylocation', locationController.getByLocation);

export default router;