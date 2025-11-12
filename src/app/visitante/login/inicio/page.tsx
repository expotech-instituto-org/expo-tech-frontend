"use client";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-[var(--azul-primario)] text-center font-bold text-[1.7rem]">
        Bem-vindo(a) a Expo 360!
      </h1>
      <h2 className="text-[var(--azul-primario)] font-bold text-[1.4rem]">
        Vamos iniciar...
      </h2>
      <div className="flex flex-col gap-4">
        <Button
          variant="contained"
          onClick={() => {
            router.push(`/login`);
          }}
          className="!bg-[var(--azul-primario)] w-[15rem]"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/cadastro`);
          }}
          className="!border-[var(--azul-primario)] !text-[var(--azul-primario)]"
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
