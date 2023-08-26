import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarUsuario } from "../db/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  console.log("Rota POST /login solicitada");
  try {
    const usuario = await autenticarUsuario(req.body.email, req.body.senha);
    if (usuario !== undefined) {
      const token = jwt.sign({ user: usuario.id }, process.env.SECRET, {
        expiresIn: 300,
      });
      res.status(202).json({ token: token });
    } else res.status(404).json({ message: "Usuário/Senha incorreta!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

export default router;