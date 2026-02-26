# 📋 Gerador de Carimbo GPON v2 — Seguro

## O que mudou

- **Senha de acesso** — tela de login antes de usar o app (sem expiração)
- **Dados protegidos** — telefones, matrículas, nomes saíram do HTML e ficam no servidor
- **Banco de dados** — todo carimbo gerado é salvo no Neon PostgreSQL
- **Histórico** — botão 📊 para consultar carimbos salvos com filtros

## Setup (3 passos)

### 1. Variável de ambiente na Vercel

Vercel → seu projeto → **Settings** → **Environment Variables**:

| Nome | Valor |
|------|-------|
| `APP_PASSWORD` | a senha que você quiser (ex: `gpon2024`) |

> A `POSTGRES_URL` já é injetada automaticamente pela integração Neon.

### 2. Criar tabela no banco

Vá em **Vercel → Storage → seu Neon DB → SQL Editor** e cole:

```sql
CREATE TABLE IF NOT EXISTS carimbos (
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
);
CREATE INDEX IF NOT EXISTS idx_carimbos_tipo ON carimbos(tipo);
CREATE INDEX IF NOT EXISTS idx_carimbos_ocorrencia ON carimbos(id_ocorrencia);
CREATE INDEX IF NOT EXISTS idx_carimbos_created ON carimbos(created_at DESC);
```

### 3. Deploy

Substitua os arquivos no GitHub e faça push:

```
carimbos-gpon/
├── public/index.html     ← frontend (SEM dados sensíveis)
├── api/
│   ├── lib/auth.js       ← helper de autenticação
│   ├── lib/db.js         ← conexão Neon
│   ├── auth.js           ← POST /api/auth (login)
│   ├── schema.js         ← GET /api/schema (dados protegidos)
│   └── stamps.js         ← GET/POST /api/stamps (banco)
├── package.json
├── vercel.json
└── setup-db.js           ← alternativa: rodar local
```

Pronto. O app vai pedir senha, carregar os dados via API e salvar cada carimbo no banco.
