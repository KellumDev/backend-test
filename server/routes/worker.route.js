import { Router } from 'express';
import { WorkerController } from '/code/controllers/worker.controller.js';
import { validateWorkerRequest } from '/code/validators/workerValidator.js'; 

const router = Router();
const workerController = new WorkerController();

router.get('/byworker', workerController.getByWorker);
router.get('/allWorkers', workerController.getAllWorkers);
router.post('/byworkerid', validateWorkerRequest, workerController.getTotalCostByWorkerId);

export default router;
