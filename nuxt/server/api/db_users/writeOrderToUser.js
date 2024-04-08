import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { email, id } = await readBody(event);
  /*  */
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  /* получаем orders_id */
  let [ord] = await con.execute(`SELECT orders_id FROM users WHERE email='${email}'`);
  if (!ord[0].orders_id) {
    ord[0].orders_id = [id];
  } else {
    ord[0].orders_id.push(id);
  }
  /*  */

  const orders = ord[0].orders_id;
  const data = [JSON.stringify(orders)];
  const sql = `UPDATE users SET orders_id=? WHERE email='${email}'`;
  try {
    //const edit = await event.context.db_mf_mysql_01.query(sql, cat);
    const runtimeConfig = useRuntimeConfig();
    const con = await mysql.createConnection({
      host: runtimeConfig.mysqlHost,
      port: runtimeConfig.mysqlPort,
      user: runtimeConfig.mysqlUser,
      password: runtimeConfig.mysqlPassword,
      database: runtimeConfig.mysqlDatabase,
    });
    const edit = await con.query(sql, data);
    con.end();
    return true;
  } catch (error) {
    con.end();
    return `Ошибка записи в базу. users. ${error}`;
  }

  /*  */
});
