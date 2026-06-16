const mongoose = require("mongoose");

const MoradorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    unidade: {
      type: String,
      required: true,
    },

    telefone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    status: {
      type: String,
      default: "Ativo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Morador", MoradorSchema);