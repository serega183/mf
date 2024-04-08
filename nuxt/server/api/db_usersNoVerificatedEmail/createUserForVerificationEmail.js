import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const user = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  const token = `${randomInteger(0, 9)}${randomInteger(0, 9)}${randomInteger(0, 9)}${randomInteger(
    0,
    9
  )}`;
  console.log("token:", token);
  try {
    const [rows] = await con.execute(
      `select * from usersNoVerificatedEmail WHERE email='${user.email.input}'`
    );
    let data = [];
    let sql = ``;

    if (!rows[0]) {
      data = [user.email.input, user.name.input, user.phone.input, user.pass.input, token];
      sql = `INSERT INTO usersNoVerificatedEmail SET email=?, name=?, phone=?, password=?, token=?`;
    } else {
      data = [user.name.input, user.phone.input, user.pass.input, token];
      sql = `UPDATE usersNoVerificatedEmail SET name=?, phone=?, password=?, token=? WHERE email='${user.email.input}'`;
    }
    const add = await con.query(sql, data);
    con.end();
  } catch (error) {
    con.end();
    return `Ошибка чтения базы. usersNoVerificatedEmail. ${error}`;
  }

  const sendMailVerification = await $fetch("/api/auth/sendMailVerification", {
    method: "POST",
    body: { email: user.email.input, token: token },
  });
  return sendMailVerification;
});

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
