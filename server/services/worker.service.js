import * as mariadb from "mariadb";
import DB_POOL from "/code/util/db.js";

export class WorkerService {

  //testing to make sure service is being called.
  async getWorkersByCriteria(criteria) {
    return [];
  }

  //testing a query
  async getAllWorkers() {
    let connection;
    try {
      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };

      const sqlQuery = `SELECT * FROM workers`;
      const rows = await connection.query(sqlQuery);

      return rows;
    } catch (error) {
      console.error(error, "Error fetching data from database");
      return [];
    } finally {
      if (connection) connection.release();
    }
  }

  async getTotalCostAllLocationTasksByWorkerId(reqBody) {
    let connection;

    try {
      const { workerId } = reqBody;
      const { locationId, status } = reqBody.filterOptions;

      let condition = `w.id = ${workerId}`;
      
      // handling for optional filter on location
      if (locationId !== null && locationId !== undefined) {
        condition += ` AND loc.id = ${locationId}`;
      }
      
      // handling for optional filter on status
      if (status !== null && status !== undefined) {
        condition += ` AND t.status = '${status}'`;
      }

      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };

      const sqlQuery = `
            SELECT 
              loc.name AS location, 
              t.description AS task_performed,
              t.status AS tasks_status,
              ROUND(SUM(l.time_seconds / 3600)) AS total_hours_work,
              ROUND(SUM(l.time_seconds / 3600 * w.hourly_wage)) AS total_cost
            FROM locations loc
            LEFT JOIN tasks t ON loc.id = t.location_id
            LEFT JOIN logged_time l ON t.id = l.task_id
            LEFT JOIN workers w ON l.worker_id = w.id
            WHERE 
            ${condition}
            GROUP BY 
              loc.name;
            `;

      const rows = await connection.query(sqlQuery);

      return rows;
    } catch (error) {
      console.error(error, "Error fetching data from database");
      return [];
    } finally {
      if (connection) connection.release();
    }
  }
}
