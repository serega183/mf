export default defineEventHandler(async (event) => {
  //const newProduct = getQuery(event);
  const { newProduct } = await readBody(event);
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  const prod = [
    newProduct.name + randomInteger(1, 50),
    "еда",
    "value-4",
    "20",
    "[value-5]",
    "[value-6]",
    "5",
    "0",
    `/products/prod_0${randomInteger(1, 4)}.jpg`,
    "[value-10]",
    "11",
    "value-12",
    "[value-13]",
    "[value-14]",
    "[value-15]",
    "[value-16]",
  ];
  const sql =
    "INSERT INTO `products`(`name`, `category`, `subcategory`, `edinic`, `units`, `price`, `balance`, `stock`, `image`, `description`, `rating`, `maker`, `param1`, `param2`, `param3`, `publicationdate`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const add = await event.context.db_mf_mysql_01.query(sql, prod);
    return add;
  } catch (error) {
    return `Ошибка записи в базу. productAdd. ${error}`;
  }
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
