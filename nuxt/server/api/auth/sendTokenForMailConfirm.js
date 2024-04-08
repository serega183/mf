// здесь проверка токена
import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { token, email } = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  try {
    const data = [token];
    const sql = `select * from usersNoVerificatedEmail WHERE email='${email}'`;
    const [rows] = await con.execute(sql);
    if (rows[0].token == token) {
      /*  */
      const user = [rows[0].name, rows[0].phone, rows[0].email, rows[0].password];
      const sql = `INSERT INTO users SET name=?, phone=?, email=?, password=?`;

      const doblUser = await $fetch("/api/db_users/userDuplicateFind", {
        method: "POST",
        body: { email: rows[0].email },
      });
      if (doblUser) {
        con.query(`DELETE FROM users WHERE email='${rows[0].email}'`);
      }
      const add = con.query(sql, user);
      con.query(`DELETE FROM usersNoVerificatedEmail WHERE email='${rows[0].email}'`);
      con.end();
      return true;
      /*  */
    } else if (rows[0].try > 0) {
      // отнимаем 1 в БД
      con.execute(
        `UPDATE usersNoVerificatedEmail SET try = try - 1 WHERE email='${rows[0].email}'`
      );

      con.end();
      return false;
    } else {
      return "resend";
    }
  } catch (error) {
    con.end();
    return `Ошибка чтения базы. usersNoVerificatedEmail. ${error}`;
  }
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
