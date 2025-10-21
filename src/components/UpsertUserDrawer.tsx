"use client";
import { editUserSchema, TEditUserSchema } from "@/schemas/editUserSchema";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePostCreateUser } from "@/service/hooks/usePostCreateUser";
import { usePutUser } from "@/service/hooks/usePutUser";
import { IGetUsersResponse } from "@/types/backendTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
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
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  userId?: string;
  open: boolean;
  onClose: () => void;
}

export function UpsertUserDrawer(props: IProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { getUserByIdData, getUserByIdError, getUserByIdPending } =
    useGetUserById({ user_id: props.userId!, enabled: !!props.userId });

  const {
    postCreateUser,
    postCreateUserData,
    postCreateUserError,
    postCreateUserRest,
  } = usePostCreateUser();

  const { putUser, putUserData, putUserError, putUserRest } = usePutUser();

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<TEditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      role: "",
      age: "",
      class: "",
      password: "",
      email: "",
    },
  });

  const handleClose = () => {
    reset();
    props.onClose();
  };

  const onSubmit: SubmitHandler<TEditUserSchema> = (data) => {
    if (props.userId) {
      return putUser({
        body: {
          email: data.email,
          password: data.password,
          role: {
            _id: String(data.role),
            name: String(data.role),
          },
          age: Number(data.age),
          class: String(data.class),
        },
        user_id: props.userId,
      });
    }
    return postCreateUser({
      body: {
        age: Number(data.age),
        class: data.class,
        email: data.email,
        password: data.password,
        role_id: data.role,
      },
    });
  };

  const handleSetFormData = (data: IGetUsersResponse) => {
    const formData: TEditUserSchema = {
      age: String(data.age),
      class: "1",
      email: data.email,
      password: data.password,
      role: "1",
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
    getUserByIdError && toast.error("Erro ao buscar usuário");
    putUserError && toast.error("Erro ao atualizar usuário");
    putUserData && toast.success("Usuário atualizado com sucesso!");
    postCreateUserError && toast.error("Erro ao criar usuário");
    postCreateUserData && toast.success("Usuário criado com sucesso!");
  }, [
    getUserByIdError,
    putUserError,
    putUserData,
    postCreateUserError,
    postCreateUserData,
  ]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle
        className="!text-[var(--azul-primario)] !font-bold"
        id="alert-dialog-title"
      >
        {props.userId ? "Editar" : "Criar"} Usuário
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="E-mail"
              type="string"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
            />
          )}
        />

        <FormControl variant="outlined">
          <InputLabel
            size="small"
            htmlFor="outlined-adornment-password"
            sx={{
              color: "var(--azul-primario)",
            }}
          >
            Senha
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
            defaultValue={""}
            render={({ field }) => (
              <Select
                {...register("role")}
                className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                id="demo-select-small-label"
                value={field.value}
                onChange={field.onChange}
                label="Cargo"
              >
                <MenuItem value={"1"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="age"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <TextField
              required
              value={field.value}
              onChange={field.onChange}
              size="small"
              label="Idade"
              type="string"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
            />
          )}
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
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <Select
                {...register("class")}
                className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                id="demo-select-small-label"
                value={field.value}
                onChange={field.onChange}
                label="Turma"
              >
                <MenuItem value={"1"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={getUserByIdPending || putUserRest || postCreateUserRest}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => handleClose()}
          className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          autoFocus
          disabled={!isValid}
          type="submit"
          className={`${isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"}`}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
