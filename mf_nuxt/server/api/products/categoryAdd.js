import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const { newCategory } = await readBody(event);
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  const cat = [
    newCategory.cat_name + randomInteger(1, 50),
    newCategory.cat_discr,
    `/categories/cat_0${randomInteger(1, 4)}.jpg`,
  ];
  const sql = "INSERT INTO `categories`(`cat_name`, `cat_discr`, `cat_img`) VALUES(?, ?, ?)";

  try {
    const add = await con.query(sql, cat);
    console.log("con.end()");
    con.end();
    return add;
  } catch (error) {
    console.log("con.end()");
    con.end();
    return `Ошибка записи в базу. categoryAdd. ${error}`;
  }
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
