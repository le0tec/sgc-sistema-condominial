const Comunicacao = require("../models/Comunicacao");

const listarComunicacoes = async (req, res) => {
  try {
    const comunicacoes = await Comunicacao.find().sort({
      createdAt: -1,
    });

    res.json(comunicacoes);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

const criarComunicacao = async (req, res) => {
  try {
    const comunicacao = await Comunicacao.create(req.body);

    res.status(201).json(comunicacao);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
};

const excluirComunicacao = async (req, res) => {
  try {
    await Comunicacao.findByIdAndDelete(req.params.id);

    res.json({
      mensagem: "Comunicado removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarComunicacoes,
  criarComunicacao,
  excluirComunicacao,
};