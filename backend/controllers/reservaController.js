const Reserva = require("../models/Reserva");

// LISTAR
const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({
      createdAt: -1,
    });

    res.json(reservas);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarReserva = async (req, res) => {
  try {
    const novaReserva = await Reserva.create(
      req.body
    );

    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EDITAR
const atualizarReserva = async (
  req,
  res
) => {
  try {
    const reservaAtualizada =
      await Reserva.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(reservaAtualizada);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Reserva removida com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarReservas,
  criarReserva,
  atualizarReserva,
  excluirReserva,
};