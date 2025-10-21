"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { UpsertUserDrawer } from "@/components/UpsertUserDrawer";
import { TUserType, UserCard } from "@/components/userCard";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [searchByName, setSearchByName] = useState<string>("");
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);

  const { getUsersData, getUsersError, getUsersPending } = useGetUsers();

  useEffect(() => {
    getUsersError && toast.error("erro ao listar usuários");
  }, []);

  return (
    <AdminTitles title="Gerenciar usuários" goback>
      <div className="flex gap-4 items-center w-full justify-between">
        <TextField
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          label="Pesquise por nome"
          variant="outlined"
          size="small"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] md:w-3/4"
        />
        <Button
          variant="contained"
          className="!w-fit !bg-[var(--azul-primario)]"
          onClick={() => setOpenEditDrawer(true)}
        >
          Criar usuário
        </Button>
      </div>
      {getUsersData?.map((user) => {
        return (
          <UserCard
            id={user._id!}
            key={user._id}
            photo={user.profile_picture}
            name={user.name || ""}
            email={user.email || ""}
            userType={user.role.name?.toLocaleLowerCase() as TUserType}
          />
        );
      })}
      <UserCard
        id={"1"}
        name={"teste"}
        email={"teste@"}
        userType={"administrador"}
      />

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getUsersPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <UpsertUserDrawer
        open={openEditDrawer}
        onClose={() => setOpenEditDrawer(false)}
      />
    </AdminTitles>
  );
}
