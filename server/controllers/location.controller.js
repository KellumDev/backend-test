import { LocationService } from '/code/services/location.service.js';

const locationService = new LocationService();

export class LocationController {
  async getByLocation(req, res) {
    try {
      // parse req and res
      const criteria = req.query.criteria;

      // call service
      const locations = await locationService.getLocationsByCriteria(criteria);

      // respond as a json
      res.json(locations);
    } catch (error) {
      // handle errors
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}