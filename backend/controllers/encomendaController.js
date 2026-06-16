const Encomenda = require("../models/Encomenda");

// LISTAR
const listarEncomendas = async (req, res) => {
  try {
    const encomendas = await Encomenda.find().sort({
      createdAt: -1,
    });

    res.json(encomendas);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarEncomenda = async (req, res) => {
  try {
    const novaEncomenda = await Encomenda.create(
      req.body
    );

    res.status(201).json(novaEncomenda);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirEncomenda = async (req, res) => {
  try {
    await Encomenda.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Encomenda removida com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarEncomendas,
  criarEncomenda,
  excluirEncomenda,
};