export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log("--------------");
  console.log("Log: " + event.node.req.url);
  console.log(query);
  console.log("--------------");
});
