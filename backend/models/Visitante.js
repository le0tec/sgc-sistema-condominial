const mongoose = require("mongoose");

const VisitanteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    documento: {
      type: String,
      required: true,
    },

    apartamento: {
      type: String,
      required: true,
    },

    dataVisita: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Autorizado",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Visitante",
  VisitanteSchema
);