"use client";

import {
  loginAdminSchema,
  TLoginAdminSchema,
} from "@/schemas/loginAdminSchema";
import { useLogin } from "@/service/hooks/login";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginAdminSchema>({
    resolver: standardSchemaResolver(loginAdminSchema),
    mode: "onChange",
    shouldUnregister: false,
  });

  const { login, loginData, loginError, loginRest } = useLogin();

  const onSubmit: SubmitHandler<TLoginAdminSchema> = (data) => {
    login({
      body: {
        password: data.password,
        username: data.email,
      },
    });
  };

  useEffect(() => {
    loginError && toast.error("Erro ao logar, " + loginError);
  }, [loginError]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[var(--background)] p-12 rounded-[var(--rounded-sm)] flex flex-col gap-8">
        <div>
          <h1 className="!text-[var(--azul-primario)] font-bold text-[23px]">
            Login
          </h1>
          <h2 className="!text-[var(--azul-primario)] ">
            Bem-vindo de volta! Preencha os dados a seguir:
          </h2>
        </div>
        <TextField
          {...register("email")}
          label="E-mail"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[25rem] "
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          className="!m-0"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{
              color: "var(--azul-primario)",
            }}
          >
            Senha
          </InputLabel>
          <OutlinedInput
            className=" [&_fieldset]:!border-[var(--azul-primario)] w-[25rem] "
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.preventDefault()
                  }
                  onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.preventDefault()
                  }
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
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className={`${
            isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"
          } w-[25rem]`}
        >
          Login
        </Button>
      </div>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loginRest}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
