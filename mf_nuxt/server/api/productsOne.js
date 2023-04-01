export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  //const id = query.id;
  console.log(query.id);
  const [rows, fields] = await event.context.db_mf_mysql_01.execute(
    `select * from products WHERE id=${query.id}`
  );
  return {
    rows,
    fields,
  };
});
