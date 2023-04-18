import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { findProduct } = await readBody(event);
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const [rows] = await con.query(`select * from products WHERE name LIKE "%${findProduct}%"`);
  con.end();
  return rows;
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
