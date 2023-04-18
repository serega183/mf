import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const [rows] = await con.query(`DELETE FROM orders WHERE id=${id}`);
  con.end();
  return "Удалено";
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
