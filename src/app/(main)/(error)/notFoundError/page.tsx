"use client";

import { Button } from "@mui/material";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-12 w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/expolvo.svg"
          alt="Expolvo - Erro não encontrado"
          className="!text-[var(--error)] text-center !text-[80px]"
        />
        <h1 className="!text-[var(--azulPrimario)] font-bold text-[23px] text-center w-[60%]">
          Não foi possível encontrar avaliações
        </h1>
        <p className="text-center text-[var(--azulPrimario)] w-[60%]">
          Crie uma avaliação agora!
        </p>
      </div>
      <Button
        variant="contained"
        onClick={() => (window.location.href = "/projeto")}
        className="!bg-[var(--azulPrimario)]"
      >
        Avaliar
      </Button>
    </div>
  );
}
