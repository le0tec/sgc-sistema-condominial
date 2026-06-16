require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ====================
// Conexão MongoDB
// ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((err) => {
    console.log("Erro MongoDB:", err);
  });

// ====================
// Rotas
// ====================

const authRoutes = require("./routes/authRoutes");

const moradorRoutes = require("./routes/moradorRoutes");
const visitanteRoutes = require("./routes/visitanteRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const ocorrenciaRoutes = require("./routes/ocorrenciaRoutes");
const comunicacaoRoutes = require("./routes/comunicacaoRoutes");
const encomendaRoutes = require("./routes/encomendaRoutes");
const financeiroRoutes = require("./routes/financeiroRoutes");

// ====================
// API Routes
// ====================

app.use("/api/auth", authRoutes);

app.use("/api/moradores", moradorRoutes);
app.use("/api/visitantes", visitanteRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/ocorrencias", ocorrenciaRoutes);
app.use("/api/comunicacao", comunicacaoRoutes);
app.use("/api/encomendas", encomendaRoutes);
app.use("/api/financeiro", financeiroRoutes);

// ====================
// Teste API
// ====================

app.get("/", (req, res) => {
  res.json({
    mensagem: "API SGC funcionando!",
  });
});

// ====================
// Inicialização
// ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});