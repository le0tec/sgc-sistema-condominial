const mongoose = require("mongoose");
require("dotenv").config();

console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro:", err);
    process.exit(1);
  });