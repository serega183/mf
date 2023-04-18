import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);
  console.log(id, status);
  /*  */
  const sql = `UPDATE orders SET status=? WHERE id=${id}`;
  try {
    const con = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORS,
      database: process.env.MYSQL_DATABASE,
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
