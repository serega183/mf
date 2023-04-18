export async function myCompValidate(apiDalee, testField, write, cart, date) {
  const fieldToValidate = {};
  for (const key in testField.value) {
    fieldToValidate[key] = { input: testField.value[key] };
  }
  const { data } = await useLazyFetch(apiDalee, {
    method: "POST",
    body: { fields: fieldToValidate, write, cart, date },
  });
  return data.value;
}
