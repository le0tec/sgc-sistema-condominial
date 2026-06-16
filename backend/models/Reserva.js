const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema(
  {
    areaComum: {
      type: String,
      required: true,
    },

    morador: {
      type: String,
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    horario: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Confirmada",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Reserva",
  ReservaSchema
);