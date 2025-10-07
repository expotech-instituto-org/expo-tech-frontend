"use client";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <h1 className="text-[var(--azul-primario)] font-bold text-[2.2rem]">
        Bem-vindo(a) a Expo 360!
      </h1>
      <h2 className="text-[var(--azul-primario)] font-bold text-[1.7rem]">
        Vamos iniciar...
      </h2>
      <div className="flex flex-col gap-4">
        <Button
          variant="contained"
          onClick={() => {
            router.push(`${path}/login`);
          }}
          className="!bg-[var(--azul-primario)] w-[25rem]"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`${path}/cadastro`);
          }}
          className="!border-[var(--azul-primario)] !text-[var(--azul-primario)]"
        >
          Cadastrar
        </Button>
      </div>
    </>
  );
}
