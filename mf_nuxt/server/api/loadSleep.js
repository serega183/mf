export default defineEventHandler((event) => {
  const qq = {
    api: "hello",
    query: getQuery(event),
  };
  return sleep(qq);
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(...args) {
  await timeout(1000);
  return args;
}
