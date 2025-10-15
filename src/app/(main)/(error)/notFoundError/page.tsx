"use client";

import { Button } from "@mui/material";

interface IProps {
  title: string;
  subtitle?: string;
  textButton: string;
  actionButton: () => void;
}

export default function Page(props: IProps) {
  return (
    <div
      className="flex 
    flex-col justify-center items-center h-[100vh] gap-12 w-full"
    >
      <div
        className="flex 
    flex-col justify-center items-center gap-4"
      >
        <img
          src="/images/expolvo.svg"
          className="!text-[var(--error)] text-center !text-[80px]"
        />
        <h1 className="!text-[var(--error)] font-bold text-[23px] text-center w-[60%]">
          Não foi possível encontrar avaliações
        </h1>
        <p className="text-center text-[var(--text)] w-[60%]">
          Cre uma valiação agora!
        </p>
      </div>
      <Button
        variant="contained"
        onClick={props.actionButton}
        className="!bg-[var(--error)]"
      >
        Avaliar
      </Button>
    </div>
  );
}
