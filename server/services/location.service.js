import DB_POOL from "/code/util/db.js";

export class LocationService {
  //testing a query
  async getAllLocations() {
    let connection;
    try {
      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };

      const sqlQuery = `SELECT * FROM locations`;
      const rows = await connection.query(sqlQuery);

      return rows;
    } catch (error) {
      console.error(error, "Error fetching data from database");
      return [];
    } finally {
      if (connection) connection.release();
    }
  }

  async getLaborCostAssociatedToLocation(reqBody) {
    let connection;
    try {
      const { locationId } = reqBody;
      const { workerId } = reqBody.filterOptions;
      let whereClause = ``;
      
      if (Array.isArray(locationId) && locationId.length > 0) {
        const locationIdList = locationId.join(", ");
        whereClause += `l.id IN (${locationIdList})`;
      } else if (typeof locationId === "number") {
        whereClause += `l.id = ${locationId}`;
      }

      if (Array.isArray(workerId) && workerId.length > 0) {
        const workerIdList = workerId.join(", ");
        whereClause += ` OR w.id IN (${workerIdList})`;
      } else if (typeof workerId === "number") {
        whereClause += ` OR w.id = ${workerId}`;
      }

      const sqlQuery = `
      SELECT 
        location_name, 
        task_description,
        performed_by,
        status,
        SUM(total_labor_cost) AS total_labor_cost
      FROM (
          SELECT 
              t.id AS task_id,
              t.description AS task_description,
              l.id AS location_id,
              l.name AS location_name,
              t.status AS status,
              w.username AS performed_by,
              SUM(lt.time_seconds) AS total_time_seconds,
              w.hourly_wage AS hourly_wage,
              (SUM(lt.time_seconds) / 3600) * w.hourly_wage AS total_labor_cost
          FROM 
              tasks t
          JOIN 
              task_locations tl ON t.id = tl.task_id
          JOIN 
              locations l ON tl.location_id = l.id
          JOIN
              logged_time lt ON t.id = lt.task_id AND l.id = lt.location_id
          JOIN
              workers w ON lt.worker_id = w.id
          WHERE
            ${whereClause} -- Filter for location ID 3
          GROUP BY
              t.id, t.description, l.id, l.name, w.hourly_wage
          ) AS labor_costs
      GROUP BY
          location_name, task_description, performed_by, status;
      `;
      
      connection = await DB_POOL.getConnection();
      connection.queryOptions = { timeout: 10000 };
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
