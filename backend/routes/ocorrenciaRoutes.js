const express = require("express");

const router = express.Router();

const {
  listarOcorrencias,
  criarOcorrencia,
  excluirOcorrencia,
} = require("../controllers/ocorrenciaController");

// LISTAR
router.get("/", listarOcorrencias);

// CADASTRAR
router.post("/", criarOcorrencia);

// EXCLUIR
router.delete("/:id", excluirOcorrencia);

module.exports = router;