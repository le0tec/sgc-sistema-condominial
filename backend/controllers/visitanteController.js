const Visitante = require("../models/Visitante");

// LISTAR
const listarVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.find().sort({
      createdAt: -1,
    });

    res.json(visitantes);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarVisitante = async (req, res) => {
  try {
    const novoVisitante = await Visitante.create(
      req.body
    );

    res.status(201).json(novoVisitante);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EDITAR
const atualizarVisitante = async (
  req,
  res
) => {
  try {
    const visitanteAtualizado =
      await Visitante.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(visitanteAtualizado);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirVisitante = async (req, res) => {
  try {
    await Visitante.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Visitante removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarVisitantes,
  criarVisitante,
  atualizarVisitante,
  excluirVisitante,
};