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
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
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
    login(
      {
        body: {
          username: data.email,
          password: data.password,
        },
      },
      {
        onError: (error) => {
          if (error?.response?.status === 401) {
            toast.error("Usuário ou senha inválidos.");
          } else {
            toast.error("Erro ao logar: " + (loginError || "Tente novamente."));
          }
        },
      }
    );
  };

  useEffect(() => {
    if (loginData) {
      Cookies.set("admin-token", loginData.access_token, {
        path: "/",
      });
      router.push("/admin/home");
    }
  }, [loginData, router]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[var(--background)] p-12 rounded-[var(--rounded-sm)] flex flex-col gap-8">
        <div>
          <h1 className="!text-[var(--azul-primario)] font-bold text-[23px]">
            Login
          </h1>
          <h2 className="!text-[var(--azul-primario)]">
            Bem-vindo de volta! Preencha os dados a seguir:
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <TextField
            {...register("email")}
            label="E-mail"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              width: "25rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--azul-primario)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--azul-primario)",
                },
                "& input": {
                  color: "var(--azul-primario)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--azul-primario)",
                "&.Mui-focused": {
                  color: "var(--azul-primario)",
                },
              },
            }}
          />

          <FormControl
            variant="outlined"
            error={!!errors.password}
            sx={{
              width: "25rem",
              m: 0,
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "var(--azul-primario)",
                "&.Mui-focused": {
                  color: "var(--azul-primario)",
                },
              }}
            >
              Senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--azul-primario)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--azul-primario)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--azul-primario)",
                },
                "& input": {
                  color: "var(--azul-primario)",
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
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
              label="Senha"
            />
            {errors.password && (
              <FormHelperText error>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            className={`${
              isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"
            } w-[25rem]`}
          >
            Login
          </Button>
        </form>
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
