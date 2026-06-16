const express = require("express");
const router = express.Router();

const {
  listarComunicacoes,
  criarComunicacao,
  excluirComunicacao,
} = require("../controllers/comunicacaoController");

router.get("/", listarComunicacoes);

router.post("/", criarComunicacao);

router.delete("/:id", excluirComunicacao);

module.exports = router;