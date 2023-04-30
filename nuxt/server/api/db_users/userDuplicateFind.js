import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  try {
    // const [rows] = await con.query(`select * from users WHERE login=aaa`);
    const [rows] = await con.execute(`select * from users WHERE email='${email}'`);
    return rows[0] ? rows[0] : false;
    con.end();
    if (rows[0]) {
      return { user: true, dara: rows };
    } else {
      return { err: "неверный логин или пароль" };
    }
  } catch (error) {
    con.end();
    return `Ошибка чтения базы. login. ${error}`;
  }
  return validatefields;
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
