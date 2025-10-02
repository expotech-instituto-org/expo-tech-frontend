import { Button } from "@mui/material";

export default function Login() {
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
          className="!bg-[var(--azul-primario)] w-[25rem]"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          className="!border-[var(--azul-primario)] !text-[var(--azul-primario)]"
        >
          Cadastrar
        </Button>
      </div>
    </>
  );
}
