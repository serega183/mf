export default defineEventHandler(async (event) => {
  const [rows] = await event.context.db_mf_mysql_01.execute("select * from products");
  return rows;
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
