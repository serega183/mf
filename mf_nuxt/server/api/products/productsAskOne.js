export default defineEventHandler(async (event) => {
  const qu = getQuery(event);
  //const id = query.id;
  console.log(qu.id);
  const [rows] = await event.context.db_mf_mysql_01.query(
    `select * from products WHERE id=${qu.id}`
  );
  return rows[0];
});
