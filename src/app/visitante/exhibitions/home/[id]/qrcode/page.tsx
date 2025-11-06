"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function QRCodePage() {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const startScanner = async () => {
    try {
      const cameras = await Html5Qrcode.getCameras();

      if (!cameras || cameras.length === 0) {
        alert("Nenhuma câmera encontrada!");
        return;
      }

      const backCamera =
        cameras.find((cam) => cam.label.toLowerCase().includes("back"))?.id ||
        cameras[0].id;

      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        backCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          disableFlip: true
        },
        (decodedText) => {
          stopScanner();
          setResult(decodedText);

          // ✅ Redireciona para o link lido
          router.push(decodedText);
        },
        (error) => {
          console.warn("Erro na leitura:", error);
        }
      );

      setStarted(true);
    } catch (err) {
      console.error("Erro ao iniciar scanner:", err);
      alert("Erro ao acessar a câmera!");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      scannerRef.current = null;
      setStarted(false);
    }
  };

useEffect(() => {
  startScanner();

  return () => {
    stopScanner().catch(err => console.error("Erro ao parar scanner:", err));
  };
}, []);


  return (
    <div style={{ padding: 20 }}>
      <h1>Leitor de QR Code</h1>

      {!result && <p>Aponte a câmera para um QR Code</p>}

      <div
        id="qr-reader"
        style={{ width: "100%", maxWidth: 400, marginTop: 20 }}
      />
    </div>
  );
}
