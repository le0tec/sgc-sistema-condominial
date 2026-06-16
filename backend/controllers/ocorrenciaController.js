const Ocorrencia = require("../models/Ocorrencia");

// LISTAR
const listarOcorrencias = async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.find().sort({
      createdAt: -1,
    });

    res.json(ocorrencias);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarOcorrencia = async (req, res) => {
  try {
    const novaOcorrencia = await Ocorrencia.create(
      req.body
    );

    res.status(201).json(novaOcorrencia);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirOcorrencia = async (req, res) => {
  try {
    await Ocorrencia.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Ocorrência removida com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarOcorrencias,
  criarOcorrencia,
  excluirOcorrencia,
};