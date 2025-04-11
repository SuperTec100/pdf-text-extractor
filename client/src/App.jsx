import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setText(data.text);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Extrator de Texto de PDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
      <Button onClick={handleUpload} disabled={!file}>Enviar</Button>
      <div className="mt-4">
        <label className="block font-medium mb-2">Texto extraído:</label>
        <textarea className="w-full h-64 p-2 border rounded" value={text} readOnly />
      </div>
    </div>
  );
}
