export default defineEventHandler(async (event) => {
  const { fields } = await readBody(event);
  console.log(fields);
  const errorsFields = {};
  for (const field in fields) {
    errorsFields[field] = [];
    const needValidate = fields[field].needValidate;
    console.log(needValidate);
    /*  */
    if (needValidate.minLength) {
      console.log("minLength");
      if (minLength(fields[field].input, fields[field].needValidate.minLength) !== true) {
        errorsFields[field].push(
          minLength(fields[field].input, fields[field].needValidate.minLength)
        );
      }
    }
    /*  */
    if (needValidate.isEmpty) {
      console.log("isEmpty");
      if (isEmpty(fields[field].input) !== true) {
        errorsFields[field].push(isEmpty(fields[field].input));
      }
    }
    /*  */
  }
  /*  */
  const errFields = {};
  for (const field in errorsFields) {
    if (errorsFields[field].length > 0) {
      errFields[field] = errorsFields[field];
    }
  }
  /*  */
  return { errFields };
});
