import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const qu = getQuery(event);
  const [rows] = await con.query(`DELETE FROM categories WHERE id_cat=${qu.id_cat}`);
  con.end();
  return "Категория удалена";
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
