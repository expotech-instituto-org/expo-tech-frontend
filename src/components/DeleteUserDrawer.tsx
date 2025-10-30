"use client";

import { useDeleteUser } from "@/service/hooks/useDeleteUser";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  userId: string;
  email: string;
  open: boolean;
  onClose: () => void;
}

interface IFeedback {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export function DeleteUserDrawer(props: IProps) {
  const [emailToDelete, setEmailToDelete] = useState<string>("");
  const [open, setOpen] = useState<IFeedback>({
    open: false,
    message: "",
    severity: "info",
  });

  const { deleteUser, deleteUserData, deleteUserError, deleteUserRest } =
    useDeleteUser();

  function handleSubmit() {
    if (emailToDelete === props.email) {
      return deleteUser({ user_id: props.userId });
    }
    return setOpen({
      open: true,
      message: "e-mail incorreto",
      severity: "error",
    });
  }

  useEffect(() => {
    deleteUserError &&
      setOpen({
        open: true,
        message: "erro ao excluir usuário",
        severity: "error",
      });
    deleteUserData &&
      setOpen({
        open: true,
        message: "usuário excluido com sucesso",
        severity: "success",
      }),
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

      <DialogContent>
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

        <Snackbar
          open={open.open}
          autoHideDuration={6000}
          onClose={() =>
            setOpen({ open: false, message: "", severity: "info" })
          }
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
