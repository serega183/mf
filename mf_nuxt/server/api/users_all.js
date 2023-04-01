export default defineEventHandler(async (event) => {
  const [rows, fields] = await event.context.db_mf_mysql_01.execute("select * from users");
  return {
    rows,
    fields,
  };
});
