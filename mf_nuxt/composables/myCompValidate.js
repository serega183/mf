export async function myCompValidate(apiDalee, testField, write, cart) {
  const fieldToValidate = {};
  for (const key in testField.value) {
    fieldToValidate[key] = { input: testField.value[key] };
  }
  const { data } = await useLazyFetch(apiDalee, {
    method: "POST",
    body: { fields: fieldToValidate, write, cart },
  });
  return data.value;
}
