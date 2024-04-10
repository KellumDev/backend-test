import * as mariadb from "mariadb";
import DB_POOL from "/code/util/db.js";



export class WorkerService {
  async getWorkersByCriteria(criteria) {
    return [];
  }

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

  async getTotalCostAllLocationTasksByWorkerId(workerId) {
    let connection;
    try {
      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };

      const sqlQuery = `
            SELECT 
              loc.name AS location,  
              SUM(l.time_seconds / 3600 * w.hourly_wage) AS total_cost
            FROM locations loc
            LEFT JOIN tasks t ON loc.id = t.location_id
            LEFT JOIN logged_time l ON t.id = l.task_id
            LEFT JOIN workers w ON l.worker_id = w.id
            WHERE w.id = ${workerId}
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
