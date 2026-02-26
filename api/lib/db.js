const { neon } = require("@neondatabase/serverless");
let _sql = null;
function getDb() {
  if (!_sql) {
    const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!url) throw new Error("POSTGRES_URL não encontrada. Verifique a integração Neon na Vercel.");
    _sql = neon(url);
  }
  return _sql;
}
module.exports = { getDb };
