import jwt from "jsonwebtoken";

function verificarAutenticacao(req, res, next) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Usuário não Autenticado" }).end();
    req.userId = decoded.user;
    next();
  });
}

export default verificarAutenticacao;