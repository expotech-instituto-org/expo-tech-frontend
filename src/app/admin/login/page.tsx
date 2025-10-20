"use client";

import { loginSchema, TLoginSchema } from "@/schemas";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TLoginSchema>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      isLogin: true,
      step: true,
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    console.log({ data });
  };

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
    </div>
  );
}
