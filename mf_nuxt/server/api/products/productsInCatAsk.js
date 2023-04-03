export default defineEventHandler(async (event) => {
  const qu = getQuery(event);
  const [rows] = await event.context.db_mf_mysql_01.query(
    `select * from products WHERE category LIKE "%${qu.cat_name}%"`
  );
  return rows;
});
