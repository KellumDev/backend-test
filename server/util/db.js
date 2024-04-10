import * as mariadb from "mariadb";

console.info("CREATING POOL...");

const DB_POOL = mariadb.createPool({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE_NAME"],
});

export default DB_POOL;
