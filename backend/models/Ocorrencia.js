const mongoose = require("mongoose");

const OcorrenciaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    descricao: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Aberta",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ocorrencia", OcorrenciaSchema);