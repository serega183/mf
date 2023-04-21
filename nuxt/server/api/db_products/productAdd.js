import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["category"] !== "undefined") {
    fields.category.needValidate = {
      isCheckCategory: true,
    };
  }
  if (typeof fields["name"] !== "undefined") {
    fields.name.needValidate = {
      isEmpty: true,
    };
  }
  if (typeof fields["edinic"] !== "undefined") {
    fields.edinic.needValidate = {
      isEmpty: true,
      isDigit: true,
    };
  }
  if (typeof fields["units"] !== "undefined") {
    fields.units.needValidate = {
      isEmpty: true,
    };
  }
  if (typeof fields["price"] !== "undefined") {
    fields.price.needValidate = {
      isEmpty: true,
      isDigit: true,
    };
  }
  if (typeof fields["balance"] !== "undefined") {
    fields.balance.needValidate = {
      isEmpty: true,
      isDigit: true,
    };
  }
  if (typeof fields["stock"] !== "undefined") {
    fields.stock.needValidate = {
      isStock: true,
    };
  }
  if (typeof fields["rating"] !== "undefined") {
    fields.rating.needValidate = {
      isDigit: true,
      isRating: true,
    };
  }
  const validatefields = await $fetch("/api/validateFieldsRules", {
    method: "POST",
    body: { fields },
  });
  if (validatefields instanceof Object) {
    return validatefields;
  } else {
    if (write) {
      const runtimeConfig = useRuntimeConfig();
      const con = await mysql.createConnection({
        host: runtimeConfig.mysqlHost,
        port: runtimeConfig.mysqlPort,
        user: runtimeConfig.mysqlUser,
        password: runtimeConfig.mysqlPassword,
        database: runtimeConfig.mysqlDatabase,
      });

      const prod = [
        fields.name.input,
        fields.category.input,
        fields.edinic.input,
        fields.units.input,
        fields.price.input,
        fields.balance.input,
        fields.stock.input,
        fields.image.input,
        fields.description.input,
        fields.rating.input,
        fields.maker.input,
        fields.param1.input,
        fields.param2.input,
        fields.param3.input,
        fields.publicationdate.input,
      ];
      const sql =
        "INSERT INTO `products`(`name`, `category`, `edinic`, `units`, `price`, `balance`, `stock`, `image`, `description`, `rating`, `maker`, `param1`, `param2`, `param3`, `publicationdate`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      try {
        const add = await con.query(sql, prod);
        con.end();
        return true;
      } catch (error) {
        con.end();
        return `Ошибка записи в базу. productAdd. ${error}`;
      }
    }
    return validatefields;
  }
  /*  */
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
