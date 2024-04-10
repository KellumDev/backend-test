import * as mariadb from "mariadb";
import DB_POOL from "/code/util/db.js";

const connection = await DB_POOL.getConnection();
console.log("DB CONNECTION IN SERVICE: ", connection);

export class WorkerService {
  async getWorkersByCriteria(criteria) {
    return [];
  }

  async getAllWorkers() {
    try {
      const rows = await connection.query("SELECT * FROM workers");
      console.log('ALL ROWS FROM WORKER TABLE: ',[rows])
      
      return ["rows"];
    } catch (error) {
      console.error(error, "Error fetching data from database");
      return error;
    } finally { 
      if(connection) connection.release();
    }
  }
}
