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
  const query = getQuery(event);
  const [rows] = await con.execute(`select * from categories WHERE id_cat=${query.id}`);
  con.end();
  return rows[0];
});
