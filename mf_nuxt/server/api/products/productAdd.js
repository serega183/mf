import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORS,
    database: process.env.MYSQL_DATABASE,
  });
  const { newProduct } = await readBody(event);
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  const prod = [
    newProduct.name + randomInteger(1, 50),
    newProduct.category,
    newProduct.subcategory,
    newProduct.edinic,
    newProduct.units,
    newProduct.price,
    newProduct.balance,
    newProduct.stock,
    `/products/prod_0${randomInteger(1, 5)}.jpg`,
    newProduct.description,
    newProduct.rating,
    newProduct.maker,
    newProduct.param1,
    newProduct.param2,
    newProduct.param3,
    newProduct.publicationdate,
  ];
  const sql =
    "INSERT INTO `products`(`name`, `category`, `subcategory`, `edinic`, `units`, `price`, `balance`, `stock`, `image`, `description`, `rating`, `maker`, `param1`, `param2`, `param3`, `publicationdate`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const add = await con.query(sql, prod);
    con.end();
    return add;
  } catch (error) {
    con.end();
    return `Ошибка записи в базу. productAdd. ${error}`;
  }
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
