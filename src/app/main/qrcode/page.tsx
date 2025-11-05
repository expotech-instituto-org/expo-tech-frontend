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
    <div className="phone-frame-center">
      <div className="phone-frame">
        {/* Header */}
        <div className="phone-header">
          <div className="left-btn">
            <IconButton
              size="small"
              onClick={() => (typeof window !== "undefined" && window.history.back())}
            >
              <ArrowBackIosIcon style={{ color: "#001489" }} />
            </IconButton>
          </div>
          <div className="title">Leitura QR Code</div>
        </div>

        {/* Área da câmera */}
        <div className="camera-area">
          {!scanResult ? (
            <ScannerWrapper
              key="qr-scanner"
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
          ) : (
            <div className="result-overlay">
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#001489", fontSize: 20, fontWeight: 700 }}>
                  QR Code Detectado:
                </h2>
                <p className="mt-4 break-all" style={{ color: "#111", maxWidth: 260 }}>
                  {scanResult}
                </p>
                <div style={{ marginTop: 18 }}>
                  <button
                    className="bg-white text-black px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
                    onClick={() => setScanResult(null)}
                  >
                    Ler Novamente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}