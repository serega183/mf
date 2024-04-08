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
    con.end();
    return rows[0] ? rows[0] : false;
  } catch (error) {
    con.end();
    return `Ошибка чтения базы. login. ${error}`;
  }
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
