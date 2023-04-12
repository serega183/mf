export default defineEventHandler((event) => {
  const qq = {
    api: "hello",
    query: getQuery(event),
  };
  return sleep(qq);
});
