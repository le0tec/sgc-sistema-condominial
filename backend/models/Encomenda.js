const mongoose = require("mongoose");

const EncomendaSchema = new mongoose.Schema(
  {
    morador: {
      type: String,
      required: true,
    },

    unidade: {
      type: String,
      required: true,
    },

    descricao: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Recebida",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Encomenda",
  EncomendaSchema
);