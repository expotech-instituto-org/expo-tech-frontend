"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { TUserType, UserCard } from "@/components/userCard";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [searchByName, setSearchByName] = useState<string>("");

  const { getUsersData, getUsersError, getUsersPending } = useGetUsers();

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
        >
          Criar usuário
        </Button>
      </div>
      {getUsersData?.map((user) => {
        return (
          <UserCard
            key={user._id}
            photo={user.profile_picture}
            name={""} //TODO - integrar
            email={user.email || ""}
            userType={user.role.name?.toLocaleLowerCase() as TUserType}
          />
        );
      })}
    </AdminTitles>
  );
}
