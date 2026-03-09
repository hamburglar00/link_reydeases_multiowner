// /api/get-telegram.js
// ✅ API GENÉRICA
// ✅ agency ES OBLIGATORIO (?agency=XX)
// ❌ NO defaults
// ✅ Devuelve { telegram_url } o 404 si no existe

const TELEGRAM_BY_AGENCY = {
  // Ejemplos (pegá acá tu mapping real)
  "8":  "https://t.me/dianawin01bot?start=hola",
  "17": "https://t.me/Geraldina_bot?start=hola",
  "23": "https://t.me/TotiLolaBot?start=hola",
  "28": "https://t.me/cetiasesBot?start=hola"
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");

  const agencyId = Number(req.query.agency);

  if (!Number.isInteger(agencyId) || agencyId <= 0) {
    return res.status(400).json({
      error: "AGENCY_REQUIRED",
      message: "Debe enviarse ?agency=<id>",
    });
  }

  const url = TELEGRAM_BY_AGENCY[String(agencyId)];

  // Si no existe → 404 (así tu front lo toma como "no disponible")
  if (!url || typeof url !== "string" || !url.startsWith("https://t.me/")) {
    return res.status(404).json({
      error: "TELEGRAM_NOT_FOUND",
      agency_id: agencyId,
    });
  }

  return res.status(200).json({
    agency_id: agencyId,
    telegram_url: url,
  });
}
