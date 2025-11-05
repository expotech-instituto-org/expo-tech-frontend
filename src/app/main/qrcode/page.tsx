"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type ScanSuccessFn = (decodedText: string) => void;
type ScanErrorFn = (error: unknown) => void;

interface ScannerWrapperProps {
  onScanSuccess: ScanSuccessFn;
  onScanError: ScanErrorFn;
}

const ScannerWrapper: React.FC<ScannerWrapperProps> = ({ onScanSuccess, onScanError }) => {
  const html5QrCodeRef = useRef<any | null>(null);

  useEffect(() => {
    const readerElement = document.getElementById("reader");
    if (!readerElement) {
      console.log("Elemento 'reader' não encontrado. Abortando ScannerWrapper.");
      return;
    }

    let mounted = true;

    const startScanner = async () => {
      try {
        const module = await import("html5-qrcode");
        const Html5Qrcode = (module as any).Html5Qrcode;
        if (!Html5Qrcode) {
          throw new Error("Html5Qrcode não disponível");
        }

        const html5QrCode = new Html5Qrcode("reader");
        html5QrCodeRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          const cameraId = (cameras[0] as any).id ?? (cameras[0] as any).deviceId ?? cameras[0];

          await html5QrCode.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }, // área de leitura (quadrado)
              aspectRatio: 1.0, // força o feed da câmera quadrado
            },
            (decodedText: string) => {
              if (!mounted) return;
              html5QrCode
                .clear()
                .then(() => onScanSuccess(decodedText))
                .catch((err: any) => {
                  console.warn("Erro ao limpar após scan:", err);
                  onScanSuccess(decodedText);
                });
            },
            (error: any) => onScanError(error)
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
      mounted = false;
      if (html5QrCodeRef.current) {
        try {
          html5QrCodeRef.current.stop?.();
        } catch (e) {
          // ignore
        }
        try {
          html5QrCodeRef.current.clear?.();
        } catch (err) {
          console.warn("Erro ao limpar scanner na desmontagem:", err);
        }
      }
    };
  }, [onScanError, onScanSuccess]);

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
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanSuccess: ScanSuccessFn = (decodedText) => setScanResult(decodedText);
  const handleScanError: ScanErrorFn = (error) => {
    console.warn("Scan error:", error);
  };

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