import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const { editedCategory } = await readBody(event);
  //const id = query.id;
  /*   console.log("==categoryEdit==========================");
  console.log(editedCategory);
  console.log("============================"); */
  const data = [editedCategory.cat_name, editedCategory.cat_discr, editedCategory.cat_img];
  const sql = `UPDATE categories SET cat_name=?, cat_discr=?, cat_img=?  WHERE id_cat=${editedCategory.id_cat}`;
  try {
    //const edit = await event.context.db_mf_mysql_01.query(sql, cat);
    const edit = await con.query(sql, data);
    con.end();
    return edit;
  } catch (error) {
    con.end();
    return `Ошибка записи в базу. categoryEdit. ${error}`;
  }
});
