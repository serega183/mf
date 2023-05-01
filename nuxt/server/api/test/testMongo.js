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
  console.log(mongoClientAuth);

  /* const connection = await mongoose.connect("mongodb://mf:mf@mf_mongodb:27017/mf");
  const Cat = connection.model("Кошки", { name: String, age: String });
  const kitty = new Cat({ name: "Мурка11", age: 8 });
  kitty.save().then(() => console.log("Готовченко, записано====="));
  const kittens = await Cat.find();
  console.log(kittens); */
});
