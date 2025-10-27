"use client";

import { useDeleteUser } from "@/service/hooks/useDeleteUser";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IProps {
  userId: string;
  email: string;
  open: boolean;
  onClose: () => void;
}

export function DeleteUserDrawer(props: IProps) {
  const [emailToDelete, setEmailToDelete] = useState<string>("");

  const { deleteUser, deleteUserData, deleteUserError, deleteUserRest } =
    useDeleteUser();

  function handleSubmit() {
    if (emailToDelete === props.email) {
      return deleteUser({ user_id: props.userId });
    }
    return toast.error("e-mail incorreto");
  }

  useEffect(() => {
    deleteUserError && toast.error("erro ao excluir usuário");
    deleteUserData && toast.success("usuário excluido com sucesso");
    props.onClose();
  }, [deleteUserError, deleteUserData]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle
        className="!text-[var(--azul-primario)] !font-bold !text-[1.3rem]"
        id="alert-dialog-title"
      >
        Excluir
        <p className="!text-[var(--azul-primario)] !font-normal !text-[1rem]">
          Digite o e-mail para confirmar a exclusão
        </p>
      </DialogTitle>

      <DialogContent className="!pt-3">
        <TextField
          value={emailToDelete}
          onChange={(e) => setEmailToDelete(e.target.value)}
          size="small"
          label="E-mail"
          type="string"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  w-full"
        />
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={deleteUserRest}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          onClick={handleSubmit}
          autoFocus
          disabled={emailToDelete.trim().length < 5}
          type="submit"
          className={`${
            emailToDelete.trim().length > 5
              ? "!border-[var(--azul-primario)] !text-[var(--azul-primario)]"
              : "!border-gray"
          }`}
        >
          Excluir
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={props.onClose}
          className="!bg-[var(--azul-primario)]"
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
