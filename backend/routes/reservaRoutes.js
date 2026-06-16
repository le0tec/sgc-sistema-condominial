const express = require("express");

const router = express.Router();

const {
  listarReservas,
  criarReserva,
  atualizarReserva,
  excluirReserva,
} = require("../controllers/reservaController");

// LISTAR
router.get("/", listarReservas);

// CADASTRAR
router.post("/", criarReserva);

// EDITAR
router.put("/:id", atualizarReserva);

// EXCLUIR
router.delete("/:id", excluirReserva);

module.exports = router;