import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  const [rows] = await con.query(`DELETE FROM orders WHERE id=${id}`);
  con.end();
  return "Удалено";
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
