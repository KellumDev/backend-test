import { WorkerService } from '/code/services/worker.service.js';

const workerService = new WorkerService();

export class WorkerController {
  async getByWorker(req, res)  {
    try {
      // parse request parameters or body  
      const criteria = req.query.criteria;

      // call the service to fetch workers based on criteria
      const workers = await workerService.getWorkersByCriteria(criteria);

      // respond with the fetched workers
      res.json(workers);
    } catch (error) {
      // handle errors and send an appropriate response
      console.error('Error fetching workers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllWorkers(req, res)  {
    try {
      const workers = await workerService.getAllWorkers();
      // respond with json
      res.json(workers);
    } catch (error) {
      // handle errors and send an appropriate response
      console.error('Error fetching all workers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTotalCostByWorkerId(req, res)  {
    try {
      //parse the req body
      const reqBody = req.body;
      //call service and get query
      const totalCosts = await workerService.getTotalCostAllLocationTasksByWorkerId(reqBody);
      
      // respond with json
      res.json({records: {totalCosts}});
    } catch (error) {
      // handle errors and send an appropriate response
      console.error('Error fetching labor costs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}