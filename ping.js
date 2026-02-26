module.exports = function handler(req, res) {
  return res.status(200).json({
    ok: true,
    method: req.method,
    node: process.version,
    env_keys: Object.keys(process.env).filter(k =>
      k.includes("POSTGRES") || k.includes("APP_") || k.includes("NEON") || k.includes("DATABASE")
    ),
    has_app_password: !!process.env.APP_PASSWORD,
    timestamp: new Date().toISOString()
  });
};
