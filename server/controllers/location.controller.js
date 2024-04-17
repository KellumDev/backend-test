import { LocationService } from '/code/services/location.service.js';

const locationService = new LocationService();

export class LocationController {

  async getAllLocations(req, res)  {
    try {
      const locations = await locationService.getAllLocations();
      // respond with json
      res.json(locations);
    } catch (error) {
      // handle errors and send an appropriate response
      console.error('Error fetching all locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getByLocationId(req, res) {
    try {
      // parse req and res
      const criteria = req.body;

      // call service
      const locations = await locationService.getLaborCostAssociatedToLocation(criteria);

      // respond as a json
      res.json(locations);
    } catch (error) {
      // handle errors
      console.error('Error fetching labor cost for locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}