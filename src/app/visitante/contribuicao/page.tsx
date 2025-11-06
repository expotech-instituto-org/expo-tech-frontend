"use client";
import {
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useContext, useState } from "react";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { DataContext } from "@/dataContext";
import Carousel from "@/components/Carousel";
import { toast } from "sonner";
import MetaProgressBar from "@/components/MetaProgressBar";

export default function Contribuicao() {
  const { userId } = useContext(DataContext);
  const [copied, setCopied] = useState(false);

  const {
    getUserById: refreshUser,
    getUserByIdData,
    getUserByIdPending,
  } = useGetUserById({ user_id: userId, enabled: true });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("comissaoformaturatech@gmail.com");
      setCopied(true);
      toast.success("Pix copiado!");
      setTimeout(() => setCopied(false), 1500); 
    } catch {
      toast.error("Erro ao copiar Pix");
    }
  };

  return (
    <div className="flex flex-col h-full text-black">
      <Container maxWidth="sm" className="h-fit pb-30">
        <div className="flex items-center justify-between pt-3 mb-6">
          <div className="flex items-center gap-2">
            <IconButton onClick={() => history.back()}>
              <ArrowBackIosIcon className="text-[var(--azul-primario)]" />
            </IconButton>
            <h1 className="text-[var(--azul-primario)] font-bold text-[2rem]">
              Contribua!
            </h1>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-5 mb-3">
          {" "}
          Olá {getUserByIdData?.name ?? "visitante"}!
        </h1>

        <Carousel
          images={[
            "/images/img1.jpg",
            "/images/img2.jpg",
            "/images/img3.jpg",
            "/images/img4.jpg",
            "/images/img5.jpg",
          ]}
        />
        <p className="text-xl font-medium my-4">
          Ajude a tornar nosso sonho realidade! Depois de tantos anos de
          dedicação, estamos prestes a alcançar uma grande conquista: nossa
          formatura! Mas, para celebrar esse momento especial, precisamos da sua
          ajuda. Qualquer valor faz diferença e nos aproxima ainda mais desse
          dia tão esperado.
        </p>
        <MetaProgressBar value={35177.35} goal={50000} />

        <div
          className="mx-auto flex flex-row items-center justify-center gap-4 my-4 cursor-pointer hover:opacity-80 transition"
          onClick={handleCopy}
        >
          <h2 className="text-3xl font-bold text-center select-none">Copiar Pix</h2>
          {copied ? (
            <CheckIcon
              sx={{ color: "green", fontSize: 32, transition: "0.3s ease" }}
            />
          ) : (
            <ContentCopyIcon
              sx={{
                fontSize: 32,
                transition: "0.3s ease",
              }}
            />
          )}
        </div>

        <Image
          src="/images/qrCodePix.jpg"
          alt="QR Code"
          width={350}
          height={350}
          className="mx-auto rounded-lg"
        />
      </Container>

      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getUserByIdPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
