const express = require("express");

const router = express.Router();

const {
  listarVisitantes,
  criarVisitante,
  atualizarVisitante,
  excluirVisitante,
} = require("../controllers/visitanteController");

// LISTAR
router.get("/", listarVisitantes);

// CADASTRAR
router.post("/", criarVisitante);

// EDITAR
router.put("/:id", atualizarVisitante);

// EXCLUIR
router.delete("/:id", excluirVisitante);

module.exports = router;