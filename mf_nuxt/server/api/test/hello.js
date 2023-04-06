export default defineEventHandler((event) => {
  return {
    api: "hello",
    query: getQuery(event),
  };
});
