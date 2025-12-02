import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const AuthController = {
  // Criar usuário
  register: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      const existente = await User.findOne({ where: { email } });
      if (existente) {
        return res.status(400).json({ error: "Email já está em uso." });
      }

      const hash = await bcrypt.hash(senha, 10);

      const novoUsuario = await User.create({
        nome,
        email,
        senha: hash
      });

      return res.json({
        message: "Usuário criado com sucesso",
        user: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email
        }
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = await User.findOne({ where: { email } });

      if (!usuario) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        message: "Login realizado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
