import mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  event.context.db_mf_mysql_01 = await mysql.createConnection({
    host: "mf_mysql_01",
    port: 3306,
    user: "mf_user",
    password: "mf_user_pass",
    database: "mf_mysql_01",
  });
});
