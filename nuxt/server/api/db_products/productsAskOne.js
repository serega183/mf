import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  const qu = getQuery(event);
  const [rows] = await con.query(`select * from products WHERE id=${qu.id}`);
  con.end();
  return rows[0];
});
