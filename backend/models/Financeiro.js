const mongoose = require("mongoose");

const FinanceiroSchema = new mongoose.Schema(
  {
    descricao: {
      type: String,
      required: true,
    },

    valor: {
      type: Number,
      required: true,
    },

    vencimento: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pendente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Financeiro",
  FinanceiroSchema
);