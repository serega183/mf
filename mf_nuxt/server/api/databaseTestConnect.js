export default defineEventHandler(async (event) => {
  const [rows, fields] = await event.context.db.execute("select * from users");
  return {
    rows,
    fields,
  };
});
