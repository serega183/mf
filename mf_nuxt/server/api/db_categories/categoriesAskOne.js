import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const query = getQuery(event);
  const [rows] = await con.execute(`select * from categories WHERE id_cat=${query.id}`);
  con.end();
  return rows[0];
});
