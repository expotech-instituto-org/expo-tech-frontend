"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

// Componente Wrapper para o Scanner
const ScannerWrapper = ({ onScanSuccess, onScanError }) => {
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const readerElement = document.getElementById("reader");
    if (!readerElement) {
      console.log("Elemento 'reader' não encontrado. Abortando ScannerWrapper.");
      return;
    }

    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          const cameraId = cameras[0].id;

          await html5QrCode.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }, // área de leitura (quadrado)
              aspectRatio: 1.0, // força o feed da câmera quadrado
            },
            (decodedText) => {
              html5QrCode.clear()
                .then(() => onScanSuccess(decodedText))
                .catch((err) => {
                  console.warn("Erro ao limpar após scan:", err);
                  onScanSuccess(decodedText);
                });
            },
            (error) => onScanError(error)
          );
        } else {
          alert("Nenhuma câmera detectada no dispositivo.");
        }
      } catch (err) {
        console.error("Erro ao iniciar câmera:", err);
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    };

    startScanner();

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.clear().catch((err) => {
          console.warn("Erro ao limpar scanner na desmontagem:", err);
        });
      }
    };
  }, []);

  return (
    <div id="reader" className="qr-reader-fullscreen">
      {/* Overlay do quadrado de leitura */}
      <div className="qr-overlay">
        <div className="qr-box"></div>
      </div>
    </div>
  );
};

export default function QRCodePage() {
  const [scanResult, setScanResult] = useState(null);

  const handleScanSuccess = (decodedText) => setScanResult(decodedText);
  const handleScanError = (error) => {};

  return (
    <div className="flex flex-col items-center h-screen bg-black relative">
      {/* Header fixo */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <IconButton
            onClick={() => (typeof window !== "undefined" && window.history.back())}
          >
            <ArrowBackIosIcon className="text-white" />
          </IconButton>
          <h1 className="text-white font-bold text-lg">Leitura QR Code</h1>
        </div>
      </div>

      {/* Corpo */}
      <div className="flex-1 flex items-center justify-center w-full">
        {!scanResult ? (
          <ScannerWrapper
            key="qr-scanner"
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white text-center p-6">
            <h2 className="text-xl font-semibold">QR Code Detectado:</h2>
            <p className="mt-4 break-all">{scanResult}</p>
            <button
              className="mt-6 bg-white text-black px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
              onClick={() => setScanResult(null)}
            >
              Ler Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
