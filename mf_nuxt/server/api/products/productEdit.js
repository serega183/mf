import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const { editedProduct } = await readBody(event);
  //const id = query.id;
  /*   console.log("==productEdit==========================");
  console.log(editedProduct);
  console.log("============================"); */
  const data = [editedProduct.name];
  const sql = `UPDATE products SET name=? WHERE id=${editedProduct.id}`;
  try {
    const edit = await con.query(sql, data);
    con.end();
    return edit;
  } catch (error) {
    con.end();
    return `Ошибка записи в базу. productEdit. ${error}`;
  }
});
