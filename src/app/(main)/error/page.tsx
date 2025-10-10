"use client";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";

export default function Page() {
  return (
    <div
      className="flex 
    flex-col justify-center items-center h-[100vh] gap-12 w-full"
    >
      <div
        className="flex 
    flex-col justify-center items-center gap-4"
      >
        <HighlightOffIcon className="!text-[var(--error)] text-center !text-[80px]" />
        <h1 className="!text-[var(--error)] font-bold text-[23px] text-center w-[60%]">
          Ops...ocorreu um erro inesperado.
        </h1>
        <p className="text-center text-[var(--text)] w-[60%]">
          Não se preocupe, não é culpa sua! Tente novamente ou contate o
          suporte.
        </p>
      </div>
      <Button variant="contained" className="!bg-[var(--error)]">
        Tentar Novamente
      </Button>
    </div>
  );
}
