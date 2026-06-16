const express = require("express");

const router = express.Router();

const {
  listarEncomendas,
  criarEncomenda,
  excluirEncomenda,
} = require("../controllers/encomendaController");

router.get("/", listarEncomendas);

router.post("/", criarEncomenda);

router.delete("/:id", excluirEncomenda);

module.exports = router;