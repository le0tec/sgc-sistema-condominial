const Financeiro = require("../models/Financeiro");

// LISTAR
const listarLancamentos = async (req, res) => {
  try {
    const lancamentos = await Financeiro.find().sort({
      createdAt: -1,
    });

    res.json(lancamentos);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarLancamento = async (req, res) => {
  try {
    const novoLancamento = await Financeiro.create(
      req.body
    );

    res.status(201).json(novoLancamento);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirLancamento = async (req, res) => {
  try {
    await Financeiro.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Lançamento removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarLancamentos,
  criarLancamento,
  excluirLancamento,
};