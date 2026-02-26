const crypto = require("crypto");

const SALT = "carimbos-gpon-rs-capital-2024";

function getPassword() {
  return process.env.APP_PASSWORD || "";
}

/** Gera token a partir da senha (determinístico, sem expiração) */
function makeToken(password) {
  return crypto.createHmac("sha256", SALT).update(password).digest("hex");
}

/** Retorna o token esperado para a senha configurada */
function expectedToken() {
  const pw = getPassword();
  if (!pw) return null;
  return makeToken(pw);
}

/** Valida token do header Authorization: Bearer <token> */
function requireAuth(req, res) {
  const pw = getPassword();
  if (!pw) {
    res.status(500).json({ error: "APP_PASSWORD não configurada na Vercel." });
    return false;
  }
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== expectedToken()) {
    res.status(401).json({ error: "Acesso negado. Faça login novamente." });
    return false;
  }
  return true;
}

module.exports = { getPassword, makeToken, expectedToken, requireAuth };
