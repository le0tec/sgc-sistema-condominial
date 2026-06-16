const Morador = require("../models/Morador");

// LISTAR
const listarMoradores = async (req, res) => {
  try {
    const moradores = await Morador.find().sort({
      createdAt: -1,
    });

    res.json(moradores);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// CADASTRAR
const criarMorador = async (req, res) => {
  try {
    const novoMorador = await Morador.create(req.body);

    res.status(201).json(novoMorador);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EDITAR
const atualizarMorador = async (req, res) => {
  try {
    const moradorAtualizado =
      await Morador.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(moradorAtualizado);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// EXCLUIR
const excluirMorador = async (req, res) => {
  try {
    await Morador.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Morador removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarMoradores,
  criarMorador,
  atualizarMorador,
  excluirMorador,
};