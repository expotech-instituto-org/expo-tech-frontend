"use client";

import { Modal } from "@/components/modal";
import { loginSchema, TLoginSchema } from "@/schemas";
import { useLogin } from "@/service/hooks/login";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFeedback {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function Page() {
  const param = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const isLogin = param.id === "login";
  const [isFromCompany, setIsFromCompany] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState<IFeedback>({
    open: false,
    message: "",
    severity: "info",
  });
  const { login, loginData, loginError, loginRest } = useLogin();

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TLoginSchema>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      isLogin: isLogin,
      step: step === 1,
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    isLogin &&
      login({
        body: {
          password: data.password,
          username: data.email,
        },
      });
  };

  useEffect(() => {
    loginError &&
      setOpen({
        open: true,
        message: "Erro ao fazer login, " + loginError,
        severity: "error",
      });
    loginData &&
      setOpen({
        open: true,
        message: "Login efetuado com sucesso!",
        severity: "success",
      });
  }, [loginError, loginData]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10"
      >
        <h1 className="text-[var(--azul-primario)] font-bold text-[1.9rem]">
          {isLogin ? "Login" : step === 1 ? "Cadastro" : "Estamos quase lá"}
        </h1>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <TextField
              {...register("email")}
              label="E-mail"
              size="small"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[15rem] "
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
                size="small"
              >
                Senha
              </InputLabel>
              <OutlinedInput
                className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem] "
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => event.preventDefault()}
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

            {!isLogin && (
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                className="!m-0"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  size="small"
                  sx={{
                    color: "var(--azul-primario)",
                  }}
                >
                  Confirmação
                </InputLabel>
                <OutlinedInput
                  className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem] "
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("passwordConfirmation")}
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => event.preventDefault()}
                        onMouseUp={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => event.preventDefault()}
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
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <TextField
              {...register("age")}
              size="small"
              label="Idade"
              type="number"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[15rem] "
            />
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              className="!m-0"
            >
              <InputLabel
                {...register("knowledge")}
                size="small"
                id="demo-select-small-label"
                sx={{
                  color: "var(--azul-primario)",
                }}
              >
                Como conheceu a feira?
              </InputLabel>
              <Select
                {...register("knowledge")}
                size="small"
                className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem]   "
                labelId="demo-select-small-label"
                id="demo-select-small"
                onChange={(e) => {
                  setValue("knowledge", e.target.value as number);
                }}
                label="Como conheceu a feira?"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              className="!m-0"
            >
              <InputLabel
                sx={{
                  color: "var(--azul-primario)",
                }}
                size="small"
                id="demo-select-small-label"
              >
                Qual perfil você se encaixa?
              </InputLabel>
              <Select
                className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem] "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register("profile")}
                size="small"
                label="Qual perfil você se encaixa?"
                onChange={(e) => {
                  setValue("profile", e.target.value as number);
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            {isFromCompany ? (
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="!m-0"
              >
                <InputLabel
                  sx={{
                    color: "var(--azul-primario)",
                  }}
                  id="demo-select-small-label"
                  size="small"
                >
                  Empresa
                </InputLabel>
                <Select
                  className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem] "
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("company")}
                  label="Empresa"
                  size="small"
                  onChange={(e) => {
                    setValue("company", e.target.value as number);
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                className="!m-0"
                size="small"
              >
                <InputLabel
                  sx={{
                    color: "var(--azul-primario)",
                  }}
                  id="demo-select-small-label"
                  size="small"
                >
                  Turma
                </InputLabel>
                <Select
                  className=" [&_fieldset]:!border-[var(--azul-primario)] w-[15rem] "
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("class")}
                  label="Turma"
                  size="small"
                  onChange={(e) => {
                    setValue("class", e.target.value as number);
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            type={isLogin ? "submit" : step === 1 ? "button" : "submit"}
            onClick={() => !isLogin && setStep(2)}
            disabled={!isValid}
            className={`${
              isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"
            } w-[15rem]`}
          >
            {isLogin ? "Entrar" : "Próximo"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/login/inicio`);
            }}
            className="!border-[var(--azul-primario)] !text-[var(--azul-primario)] w-[15rem]"
          >
            Voltar
          </Button>
        </div>

        {openModal && (
          <Modal
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            title="Você ainda não está cadastrado"
            subtitle="Deseja se cadastrar agora?"
          >
            <div className="!flex !flex-col !items-center">
              <div className="flex flex-col gap-4">
                <Button
                  variant="contained"
                  className="!bg-[var(--azul-primario)] w-[15rem]"
                >
                  Cadastrar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  className="!border-[var(--azul-primario)] w-[15rem] !text-[var(--azul-primario)]"
                >
                  Voltar
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </form>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loginRest}
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
    </>
  );
}
