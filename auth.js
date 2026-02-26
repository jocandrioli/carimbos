const { getPassword, makeToken } = require("./lib/auth");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });

  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: "Senha não informada." });

  const expected = getPassword();
  if (!expected) return res.status(500).json({ error: "APP_PASSWORD não configurada." });

  if (password !== expected) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  return res.status(200).json({ token: makeToken(password) });
};
