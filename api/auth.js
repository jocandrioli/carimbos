const crypto = require("crypto");

const SALT = "carimbos-gpon-rs-capital-2024";

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });

  try {
    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: "Senha não informada." });

    const expected = process.env.APP_PASSWORD || "";
    if (!expected) {
      return res.status(500).json({
        error: "APP_PASSWORD não configurada.",
        hint: "Vercel → Settings → Environment Variables → adicione APP_PASSWORD → Redeploy"
      });
    }

    if (password !== expected) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = crypto.createHmac("sha256", SALT).update(password).digest("hex");
    return res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ error: "Erro interno: " + err.message });
  }
};
