const mongoose = require("mongoose");

const ComunicacaoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    mensagem: {
      type: String,
      required: true,
    },

    data: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comunicacao", ComunicacaoSchema);