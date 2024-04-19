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
      // parse the req body
      const { workerId } = reqBody;
      const { locationId, status } = reqBody.filterOptions;

      let condition = ``;

      // check if worker id is an array or a number to produce proper where clause
      if (Array.isArray(workerId) && workerId.length > 0) {
        const workerIdList = workerId.join(", ");
        condition += `w.id IN (${workerIdList})`;
      } else if (typeof workerId === "number") {
        condition += `w.id = ${workerId}`;
      }

      // check if location id is an array or a number to produce proper where clause
      if (Array.isArray(locationId) && locationId.length > 0) {
        const locationIdList = locationId.join(", ");
        condition += ` AND l.id IN (${locationIdList})`;
      } else if (typeof locationId === "number") {
        condition += ` AND l.id = ${locationId}`;
      }

      //use the connection pool
      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };

      //query to run
      const sqlQuery = `
            SELECT 
              username,
              location,
              hourly_wage,
              ROUND(SUM(total_hours_work)) AS total_hours_work,
              ROUND(SUM(total_cost)) AS total_cost
            FROM (SELECT 
              w.username AS username, 
              l.name AS location,
              w.hourly_wage AS hourly_wage,
              lt.time_seconds / 3600 AS total_hours_work,
              lt.time_seconds / 3600 * w.hourly_wage AS total_cost
            FROM logged_time lt
            JOIN 
              workers w ON lt.worker_id = w.id
            JOIN 
              tasks t ON lt.task_id = t.id
            JOIN 
              locations l ON lt.location_id = l.id
            WHERE 
              ${condition}
            ) AS labor_costs
            GROUP BY 
              username, 
              location,
              hourly_wage;
            `;
      //run the query
      let rows = await connection.query(sqlQuery);
      
      // check if there is an empty set 
      if (rows.length === 0) {
        rows = "no records found";
      }

      return rows;
    } catch (error) {
      console.error(error, "Error fetching data from database");
      return [];
    } finally {
      if (connection) connection.release();
    }
  }
}
