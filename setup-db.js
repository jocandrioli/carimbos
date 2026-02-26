/**
 * Cria a tabela no Neon PostgreSQL.
 *
 * Opção 1 — rodar localmente:
 *   POSTGRES_URL="postgresql://..." node setup-db.js
 *
 * Opção 2 — colar o SQL abaixo direto no console Neon/Vercel:
 *   https://console.neon.tech → SQL Editor
 *
 * SQL:
 *   CREATE TABLE IF NOT EXISTS carimbos (
 *     id SERIAL PRIMARY KEY,
 *     tipo VARCHAR(50) NOT NULL,
 *     id_ocorrencia VARCHAR(100),
 *     supervisor VARCHAR(200),
 *     tecnicos TEXT,
 *     analista_ccr VARCHAR(200),
 *     texto_gerado TEXT NOT NULL,
 *     dados_formulario JSONB,
 *     geo_lat DOUBLE PRECISION,
 *     geo_lng DOUBLE PRECISION,
 *     geo_accuracy DOUBLE PRECISION,
 *     created_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 *   CREATE INDEX IF NOT EXISTS idx_carimbos_tipo ON carimbos(tipo);
 *   CREATE INDEX IF NOT EXISTS idx_carimbos_ocorrencia ON carimbos(id_ocorrencia);
 *   CREATE INDEX IF NOT EXISTS idx_carimbos_created ON carimbos(created_at DESC);
 */

const { neon } = require("@neondatabase/serverless");

async function setup() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) { console.error("❌ Defina POSTGRES_URL. Ex:\n  POSTGRES_URL=\"postgresql://...\" node setup-db.js"); process.exit(1); }

  const sql = neon(url);

  console.log("🔧 Criando tabela carimbos...");
  await sql`CREATE TABLE IF NOT EXISTS carimbos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    id_ocorrencia VARCHAR(100),
    supervisor VARCHAR(200),
    tecnicos TEXT,
    analista_ccr VARCHAR(200),
    texto_gerado TEXT NOT NULL,
    dados_formulario JSONB,
    geo_lat DOUBLE PRECISION,
    geo_lng DOUBLE PRECISION,
    geo_accuracy DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE INDEX IF NOT EXISTS idx_carimbos_tipo ON carimbos(tipo)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_carimbos_ocorrencia ON carimbos(id_ocorrencia)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_carimbos_created ON carimbos(created_at DESC)`;

  const c = await sql`SELECT COUNT(*)::int AS total FROM carimbos`;
  console.log(`✅ Pronto! Registros existentes: ${c[0].total}`);
}

setup().catch(e => { console.error("❌", e.message); process.exit(1); });
