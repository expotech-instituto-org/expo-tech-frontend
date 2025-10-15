"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push('/'); 
  };
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
        <h1 className="!text-[var(--azulPrimario)] font-bold text-[23px] text-center w-[60%]">
          Não foi possível encontrar avaliações
        </h1>
        <p className="text-center text-[var(--azulPrimario)] w-[60%]">
          Cre uma valiação agora!
        </p>
      </div>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        className="!bg-[var(--azulPrimario)]"
      >
        Avaliar
      </Button>
    </div>
  );
}
