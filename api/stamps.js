const { requireAuth } = require("./lib/auth");
const { getDb } = require("./lib/db");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!requireAuth(req, res)) return;

  const sql = getDb();

  try {
    // ── POST: salvar carimbo ──
    if (req.method === "POST") {
      const { tipo, id_ocorrencia, supervisor, tecnicos, analista_ccr,
              texto_gerado, dados_formulario, geo_lat, geo_lng, geo_accuracy } = req.body || {};

      if (!tipo || !texto_gerado) {
        return res.status(400).json({ error: "Campos 'tipo' e 'texto_gerado' são obrigatórios." });
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

    // ── GET: listar carimbos ──
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

    return res.status(405).json({ error: "Método não permitido." });

  } catch (err) {
    console.error("Stamps error:", err);
    return res.status(500).json({ error: "Erro no banco de dados.", details: err.message });
  }
};
