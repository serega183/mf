import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);
  console.log(id, status);
  /*  */
  const sql = `UPDATE orders SET status=? WHERE id=${id}`;
  try {
    const runtimeConfig = useRuntimeConfig();
    const con = await mysql.createConnection({
      host: runtimeConfig.mysqlHost,
      port: runtimeConfig.mysqlPort,
      user: runtimeConfig.mysqlUser,
      password: runtimeConfig.mysqlPassword,
      database: runtimeConfig.mysqlDatabase,
    });
    const edit = await con.query(sql, status);
    con.end();
    return true;
  } catch (error) {
    con.end();
    return `Ошибка записи в базу. categoryEdit. ${error}`;
  }

  /*  */
});
