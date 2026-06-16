const express = require("express");

const router = express.Router();

const {
  listarMoradores,
  criarMorador,
  atualizarMorador,
  excluirMorador,
} = require("../controllers/moradorController");

// LISTAR
router.get("/", listarMoradores);

// CADASTRAR
router.post("/", criarMorador);

// EDITAR
router.put("/:id", atualizarMorador);

// EXCLUIR
router.delete("/:id", excluirMorador);

module.exports = router;