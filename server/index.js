const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(fileUpload());

app.post("/api/upload", async (req, res) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  try {
    const data = await pdfParse(req.files.pdf);
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: "Erro ao ler o PDF" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
