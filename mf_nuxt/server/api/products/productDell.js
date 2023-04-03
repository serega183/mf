export default defineEventHandler(async (event) => {
  const qu = getQuery(event);
  const [rows] = await event.context.db_mf_mysql_01.query(`DELETE FROM products WHERE id=${qu.id}`);
  return "Удалено";
});
async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return args;
}
