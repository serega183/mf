export default defineEventHandler((event) => {
  const qq = {
    api: "hello",
    query: getQuery(event),
  };
  return sleep(qq);
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
