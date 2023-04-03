export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  //const id = query.id;
  console.log("============================");

  console.log(query);
  console.log("============================");

  const [rows] = await event.context.db_mf_mysql_01.execute(
    `select * from categories WHERE id_cat=${query.id}`
  );
  return rows[0];
});
