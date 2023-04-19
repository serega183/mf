import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { filterStatus, filterDate } = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const con = await mysql.createConnection({
    host: runtimeConfig.mysqlHost,
    port: runtimeConfig.mysqlPort,
    user: runtimeConfig.mysqlUser,
    password: runtimeConfig.mysqlPassword,
    database: runtimeConfig.mysqlDatabase,
  });
  //const [rows] = await con.execute("select * from orders");
  /*  */
  let sql = ``;
  if (filterDate == "Все" && filterStatus == "Все") {
    sql = `select * from orders`;
  } else if (filterDate == "Все" && filterStatus != "Все") {
    sql = `select * from orders WHERE status='${filterStatus}'`;
  } else if (filterDate != "Все" && filterStatus == "Все") {
    sql = `select * from orders WHERE date BETWEEN '${filterDate.ot}' AND '${filterDate.do}'`;
  } else if (filterDate != "Все" && filterStatus != "Все") {
    //sql = `select * from orders WHERE date='${filterDate}' AND status='${filterStatus}'`;
    sql = `select * from orders WHERE date BETWEEN '${filterDate.ot}' AND '${filterDate.do}' AND status='${filterStatus}'`;
  }
  const resp = {
    err: null,
    resp: null,
  };
  try {
    const [rows] = await con.query(sql);
    resp.resp = rows;
    con.end();
    return resp;
  } catch (error) {
    resp.err = `Ошибка чтения базы. ordersAll. ${error}`;
    return resp;
  }

  /*  */
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
