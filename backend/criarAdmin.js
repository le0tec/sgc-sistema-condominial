require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

async function criarAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado");

    const senhaCriptografada = await bcrypt.hash(
      "123456",
      10
    );

    const usuarioExistente =
      await User.findOne({
        email: "admin@sgc.com",
      });

    if (usuarioExistente) {
      console.log(
        "Administrador já existe."
      );

      process.exit();
    }

    await User.create({
      nome: "Administrador",
      email: "admin@sgc.com",
      senha: senhaCriptografada,
      perfil: "Administrador",
    });

    console.log(
      "Administrador criado com sucesso!"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

criarAdmin();