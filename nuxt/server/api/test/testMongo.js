import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  console.log("mongo");
  /* const Cat = defineMongooseModel({
  name: "Кошки",
  schema: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
}); */
  const connection = await mongoose.connect(
    "mongodb://api_user:api1234@mf_mongodb:27017/api_test_db"
  );
  //console.log(connection);
  const Cat = connection.model("Кошки", {});

  console.log("-=-=-=-=");

  const kitty = new Cat({ name: "Мурка22", age: 15 });
  kitty.save().then(() => console.log("Готовченко, записано====="));
  const kittens = await Cat.find();
  console.log(kittens);
  /*   const query = getQuery(event);
  console.log("--- Log: " + event.node.req.url);
  console.log(query);
  console.log("--------------"); */
  // async..await is not allowed in global scope, must use a wrapper
});
