"use client";
import { editUserSchema, TEditUserSchema } from "@/schemas/editUserSchema";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { IGetUsersResponse } from "@/types/backendTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

interface IFeedback {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export function EditUserDrawer(props: IProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<IFeedback>({
    open: false,
    message: "",
    severity: "info",
  });

  const { getUserByIdData, getUserByIdError, getUserByIdPending } =
    useGetUserById({ user_id: props.userId });

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<TEditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      role: 0,
    },
  });

  const handleClose = () => {
    reset();
    props.onClose();
  };

  const onSubmit: SubmitHandler<TEditUserSchema> = (data) => {
    console.log({ data });
  };

  const handleSetFormData = (data: IGetUsersResponse) => {
    const formData: TEditUserSchema = {
      age: data.age,
      class: data.class,
      email: data.email,
      password: data.password,
      role: data.role._id,
    };

    Object.keys(formData).forEach((field) => {
      setValue(
        field as keyof TEditUserSchema,
        formData[field as keyof TEditUserSchema]
      );
    });
  };

  useEffect(() => {
    if (!getUserByIdData) return;

    handleSetFormData(getUserByIdData);
  }, [getUserByIdData]);

  useEffect(() => {
    getUserByIdError &&
      setOpen({
        open: true,
        message: "erro ao listar usuários",
        severity: "error",
      });
  }, []);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle
        className="!text-[var(--azul-primario)] !font-bold"
        id="alert-dialog-title"
      >
        Editar Usuário
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6">
        <TextField
          size="small"
          {...register("email")}
          label="E-mail"
          type="string"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
        />

        <FormControl variant="outlined">
          <InputLabel
            size="small"
            htmlFor="outlined-adornment-password"
            sx={{
              color: "var(--azul-primario)",
            }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            size="small"
            {...register("password")}
            className=" [&_fieldset]:!border-[var(--azul-primario)]  "
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: "var(--azul-primario)",
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: "var(--azul-primario)",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="!m-0">
          <InputLabel
            {...register("role")}
            id="demo-select-small-label"
            sx={{
              color: "var(--azul-primario)",
            }}
          >
            Cargo
          </InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...register("role")}
                className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                id="demo-select-small-label"
                value={field.value}
                onChange={field.onChange}
                label="Cargo"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <TextField
          size="small"
          {...register("age")}
          label="Idade"
          type="number"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
        />

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="!m-0">
          <InputLabel
            {...register("class")}
            id="demo-select-small-label"
            sx={{
              color: "var(--azul-primario)",
            }}
          >
            Turma
          </InputLabel>
          <Select
            {...register("class")}
            className=" [&_fieldset]:!border-[var(--azul-primario)]    "
            id="demo-select-small-label"
            onChange={(e) => {
              setValue("role", e.target.value as number);
            }}
            label="Como conheceu a feira?"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={getUserByIdPending}
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
          variant="outlined"
          onClick={handleClose}
          className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          autoFocus
          type="submit"
          className={`${isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"}`}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
