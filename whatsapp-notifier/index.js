const express = require("express");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const app = express();
const port = Number(process.env.WHATSAPP_NOTIFIER_PORT || 3001);

let isReady = false;

app.use(express.json());

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "nexus-cafe-owner",
    dataPath: ".whatsapp-session",
  }),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code from WhatsApp > Linked Devices > Link Device");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  isReady = true;
  console.log("WhatsApp Ready!");
});

client.on("disconnected", (reason) => {
  isReady = false;
  console.log("WhatsApp disconnected:", reason);
});

app.get("/health", (_req, res) => {
  res.json({ ready: isReady });
});

app.post("/send-booking", async (req, res) => {
  if (!isReady) {
    return res.status(503).json({
      success: false,
      error: "WhatsApp is not ready. Start the notifier and scan the QR code.",
    });
  }

  const phone = String(req.body?.phone ?? "").replace(/\D/g, "");
  const message = String(req.body?.message ?? "").trim();

  if (!phone || !message) {
    return res.status(400).json({
      success: false,
      error: "phone and message are required.",
    });
  }

  try {
    await client.sendMessage(`${phone}@c.us`, message);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Could not send WhatsApp message.",
    });
  }
});

client.initialize();

app.listen(port, () => {
  console.log(`WhatsApp notifier API running at http://localhost:${port}`);
});
