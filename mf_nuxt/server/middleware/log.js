export default defineEventHandler((event) => {
  console.log("Log: " + event.node.req.url);
});
