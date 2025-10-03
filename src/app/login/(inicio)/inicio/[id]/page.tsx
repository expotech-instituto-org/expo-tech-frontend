"use client";

import { Modal } from "@/components/Modal";
import { Button, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const param = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(true);

  const isLogin = param.id === "login" ? "login" : "cadastro";
  return (
    <>
      {isLogin ? (
        <>
          <h1 className="text-[var(--azul-primario)] font-bold text-[2.2rem]">
            Login
          </h1>
          <div className="flex flex-col gap-4">
            <TextField
              label="E-mail"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[25rem] "
            />
            <TextField
              label="Senha"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              className=" [&_fieldset]:!border-[var(--azul-primario)] w-[25rem] [&>*]:!text-[var(--azul-primario)]  "
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button
              variant="contained"
              // onClick={() => {
              //   router.push(`${path}/login`);
              // }}
              className="!bg-[var(--azul-primario)] w-[25rem]"
            >
              Próximo
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                router.push(`/inicio`);
              }}
              className="!border-[var(--azul-primario)] !text-[var(--azul-primario)] w-[25rem]"
            >
              Voltar
            </Button>
          </div>
        </>
      ) : null}

      {openModal && (
        <Modal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          title="Você ainda não está cadastrado"
          subtitle="Deseja se cadastrar agora?"
        >
          <div className="!flex !flex-col !items-center">
            <div className="flex flex-col gap-4">
              <Button
                variant="contained"
                className="!bg-[var(--azul-primario)] w-[15rem]"
              >
                Cadastrar
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenModal(false);
                }}
                className="!border-[var(--azul-primario)] w-[15rem] !text-[var(--azul-primario)]"
              >
                Voltar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
