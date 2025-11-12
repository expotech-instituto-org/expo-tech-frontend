"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";


export default function AutenticationPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FB] px-4 text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        <Image
          src="/images/expolvoEmail.png"
          alt="Verificação de Email"
          width={250}
          height={250}
          className="object-contain w-[60%] max-w-[250px] h-auto"
        />
        <div>
          <h1 className="text-2xl font-bold text-[var(--azul-primario)] mb-2">
            Estamos quase lá
          </h1>
          <p className="text-[var(--azul-primario)] text-base">
            Verifique seu email para poder acessar o aplicativo
          </p>
        </div>
        <Button
          variant="contained"
          className="!bg-[var(--azul-primario)] !text-white w-full max-w-[250px]"
          onClick={() => router.push("/inicio")}
        >
          Voltar ao login
        </Button>
      </div>
    </div>
  );
}
