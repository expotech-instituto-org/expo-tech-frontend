"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { TUserType, UserCard } from "@/components/userCard";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IFeedback {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export default function Page() {
  const [searchByName, setSearchByName] = useState<string>("");
  const [open, setOpen] = useState<IFeedback>({
    open: false,
    message: "",
    severity: "info",
  });

  const { getUsersData, getUsersError, getUsersPending } = useGetUsers();

  useEffect(() => {
    getUsersError &&
      setOpen({
        open: true,
        message: "erro ao listar usuários",
        severity: "error",
      });
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
        >
          Criar usuário
        </Button>
      </div>
      {getUsersData?.map((user) => {
        return (
          <UserCard
            id={user._id}
            key={user._id}
            photo={user.profile_picture}
            name={""} //TODO - integrar
            email={user.email || ""}
            userType={user.role.name?.toLocaleLowerCase() as TUserType}
          />
        );
      })}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getUsersPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={open.open}
        autoHideDuration={6000}
        onClose={() => setOpen({ open: false, message: "", severity: "info" })}
      >
        <Alert
          onClose={() =>
            setOpen({ open: false, message: "", severity: "info" })
          }
          severity={open.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </AdminTitles>
  );
}
