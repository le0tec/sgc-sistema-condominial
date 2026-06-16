const express = require("express");

const router = express.Router();

const {
  listarLancamentos,
  criarLancamento,
  excluirLancamento,
} = require("../controllers/financeiroController");

router.get("/", listarLancamentos);

router.post("/", criarLancamento);

router.delete("/:id", excluirLancamento);

module.exports = router;