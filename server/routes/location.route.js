import { Router } from 'express';
import { LocationController } from '/code/controllers/location.controller.js';
import { validateLocationRequest } from '/code/validators/locationValidator.js'; 

const router = Router();
const locationController = new LocationController();

router.get('/allLocations', locationController.getAllLocations);
router.post('/bylocationid', validateLocationRequest, locationController.getByLocationId);

export default router;