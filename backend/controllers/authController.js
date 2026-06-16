const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
      },
      "SGC_SECRET",
      {
        expiresIn: "8h",
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  login,
};