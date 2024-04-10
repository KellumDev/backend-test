import { Router } from 'express';
import { WorkerController } from '/code/controllers/worker.controller.js';

const router = Router();
const workerController = new WorkerController();

router.get('/byworker', workerController.getByWorker);
router.get('/allWorkers', workerController.getAllWorkers);

export default router;
