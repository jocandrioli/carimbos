const crypto = require("crypto");

const SALT = "carimbos-gpon-rs-capital-2024";

function checkAuth(req, res) {
  const pw = process.env.APP_PASSWORD || "";
  if (!pw) { res.status(500).json({ error: "APP_PASSWORD não configurada." }); return false; }
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const expected = crypto.createHmac("sha256", SALT).update(pw).digest("hex");
  if (!token || token !== expected) { res.status(401).json({ error: "Acesso negado." }); return false; }
  return true;
}

function getDbUrl() {
  // Tenta sem prefixo e com prefixo carimbosgpon_
  return process.env.POSTGRES_URL
    || process.env.carimbosgpon_POSTGRES_URL
    || process.env.DATABASE_URL
    || process.env.carimbosgpon_DATABASE_URL
    || null;
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!checkAuth(req, res)) return;

  try {
    const url = getDbUrl();
    if (!url) throw new Error("Variavel de conexao do banco nao encontrada.");

    const { neon } = require("@neondatabase/serverless");
    const sql = neon(url);

    if (req.method === "POST") {
      const { tipo, id_ocorrencia, supervisor, tecnicos, analista_ccr,
              texto_gerado, dados_formulario, geo_lat, geo_lng, geo_accuracy } = req.body || {};

      if (!tipo || !texto_gerado) {
        return res.status(400).json({ error: "Campos 'tipo' e 'texto_gerado' sao obrigatorios." });
      }

      const result = await sql`
        INSERT INTO carimbos (tipo, id_ocorrencia, supervisor, tecnicos, analista_ccr,
          texto_gerado, dados_formulario, geo_lat, geo_lng, geo_accuracy)
        VALUES (${tipo}, ${id_ocorrencia || null}, ${supervisor || null},
          ${tecnicos || null}, ${analista_ccr || null}, ${texto_gerado},
          ${dados_formulario ? JSON.stringify(dados_formulario) : null},
          ${geo_lat || null}, ${geo_lng || null}, ${geo_accuracy || null})
        RETURNING id, created_at
      `;
      return res.status(201).json({ ok: true, id: result[0].id, created_at: result[0].created_at });
    }

    if (req.method === "GET") {
      const { page = "1", limit = "50", tipo, id_ocorrencia } = req.query || {};
      const pg = Math.max(1, parseInt(page));
      const lm = Math.min(100, Math.max(1, parseInt(limit)));
      const off = (pg - 1) * lm;

      let rows;
      if (tipo && id_ocorrencia) {
        rows = await sql`SELECT id,tipo,id_ocorrencia,supervisor,tecnicos,analista_ccr,texto_gerado,geo_lat,geo_lng,created_at FROM carimbos WHERE tipo=${tipo} AND id_ocorrencia ILIKE ${'%'+id_ocorrencia+'%'} ORDER BY created_at DESC LIMIT ${lm} OFFSET ${off}`;
      } else if (tipo) {
        rows = await sql`SELECT id,tipo,id_ocorrencia,supervisor,tecnicos,analista_ccr,texto_gerado,geo_lat,geo_lng,created_at FROM carimbos WHERE tipo=${tipo} ORDER BY created_at DESC LIMIT ${lm} OFFSET ${off}`;
      } else if (id_ocorrencia) {
        rows = await sql`SELECT id,tipo,id_ocorrencia,supervisor,tecnicos,analista_ccr,texto_gerado,geo_lat,geo_lng,created_at FROM carimbos WHERE id_ocorrencia ILIKE ${'%'+id_ocorrencia+'%'} ORDER BY created_at DESC LIMIT ${lm} OFFSET ${off}`;
      } else {
        rows = await sql`SELECT id,tipo,id_ocorrencia,supervisor,tecnicos,analista_ccr,texto_gerado,geo_lat,geo_lng,created_at FROM carimbos ORDER BY created_at DESC LIMIT ${lm} OFFSET ${off}`;
      }

      const cnt = await sql`SELECT COUNT(*)::int AS total FROM carimbos`;
      const total = cnt[0]?.total || 0;

      return res.status(200).json({
        carimbos: rows,
        pagination: { page: pg, limit: lm, total, pages: Math.ceil(total / lm) }
      });
    }

    return res.status(405).json({ error: "Metodo nao permitido." });

  } catch (err) {
    console.error("Stamps error:", err);
    return res.status(500).json({ error: err.message || "Erro no banco de dados." });
  }
};
