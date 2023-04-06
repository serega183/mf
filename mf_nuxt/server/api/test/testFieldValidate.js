export default defineEventHandler(async (event) => {
  const { fields } = await readBody(event);
  try {
    const isValid = $fetch("/api/validateFields", {
      method: "POST",
      body: { fields },
    });
    return isValid ? isValid : "всё ок";
  } catch (error) {
    return error;
  }
  return "xxxxxxx";
});
