"use client";

import { Modal } from "@/components/Modal";
import { loginSchema, TLoginSchema } from "@/schemas";
import { useLogin } from "@/service/hooks/login";
import { useGetClasses } from "@/service/hooks/useGetClasses";
import { useGetCompanies } from "@/service/hooks/useGetCompanies";
import { useGetKnowledge } from "@/service/hooks/useGetKnowledge";
import { usePostCreateUser } from "@/service/hooks/usePostCreateUser";
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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const param = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isLogin = param.id === "login";
  const [isFromCompany, setIsFromCompany] = useState<boolean>(true);
  const [isVisitor, setIsVisitor] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const { login, loginData, loginError, loginRest } = useLogin();
  const { postCreateUser, postCreateUserError, postCreateUserRest } =
    usePostCreateUser();

  const { getClassesData, getClassesError, getClassesPending } = useGetClasses({
    enabled: true,
  });

  const {
    getCompaniesData,
    getCompaniesError,
    getCompaniesRest: getCompaniesPending,
  } = useGetCompanies({
    enabled: !isLogin,
  });

  const { getKnowledgeData, getKnowledgeError, getKnowledgePending } =
    useGetKnowledge({
      enabled: !isLogin,
    });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<TLoginSchema>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      isLogin: isLogin,
      step: 1,
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const step = watch("step");

  useEffect(() => {
    setValue("knowledge", "0");
    setValue("profile", "1");
    setValue("company", "0");
    setValue("class", "0");
  }, []);

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    if (isLogin) {
      setLoginErrorMessage(""); // Limpa mensagem de erro anterior
      login(
        {
          body: {
            password: data.password,
            username: data.email,
          },
        },
        {
          onError(error) {
            setLoginErrorMessage("E-mail ou senha incorretos");
          },
        }
      );
    }

    if (data.step === 2) {
      postCreateUser(
        {
          body: {
            user: {
              name: "",
              email: data.email,
              password: data.password,
              age: Number(data.age),
              class: data.class,
              company: data.company,
              knowledge: data.knowledge,
            },
            profile_picture: "",
          },
        },
        {
          onError(error) {
            if (error.response?.status === 409) {
              setAlreadySignedUp(true);
            }
            toast.error(
              "Erro ao criar usuário, " + error.response?.data?.message
            );
          },
          onSuccess() {
            login({
              body: {
                password: data.password,
                username: data.email,
              },
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    loginError && toast.error("Erro ao fazer login, " + loginError);
    postCreateUserError &&
      toast.error("Erro ao fazer cadastro, " + postCreateUserError);

    if (loginData) {
      Cookies.set("visitante-token", loginData.access_token, {
        path: "/",
      });
      router.push("/visitantes/login/autentication");
    }
    getClassesError && toast.error("Erro ao buscar turmas");
    getCompaniesError && toast.error("Erro ao buscar empresas");
    getKnowledgeError && toast.error("Erro ao buscar conhecimentos");
  }, [
    loginError,
    loginData,
    postCreateUserError,
    getClassesError,
    getCompaniesError,
  ]);

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
              required
              label="E-mail"
              size="small"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[20rem] "
              onChange={(e) => {
                register("email").onChange(e);
                if (loginErrorMessage) {
                  setLoginErrorMessage("");
                }
              }}
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
                required
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "var(--azul-primario)",
                }}
                size="small"
              >
                Senha
              </InputLabel>
              <OutlinedInput
                className=" [&_fieldset]:!border-[var(--azul-primario)] w-[20rem] "
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                size="small"
                onChange={(e) => {
                  register("password").onChange(e);
                  if (loginErrorMessage) {
                    setLoginErrorMessage("");
                  }
                }}
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
              {isLogin && loginErrorMessage && (
                <span className="text-red-500 text-sm mt-1">
                  {loginErrorMessage}
                </span>
              )}
            </FormControl>

            {!isLogin && (
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                className="!m-0"
              >
                <InputLabel
                  required
                  htmlFor="outlined-adornment-password"
                  size="small"
                  sx={{
                    color: "var(--azul-primario)",
                  }}
                >
                  Repita a senha
                </InputLabel>
                <OutlinedInput
                  className=" [&_fieldset]:!border-[var(--azul-primario)] w-[20rem] "
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
                  type="number"
                  variant="outlined"
                  helperText={
                    "age" in errors && (errors.age?.message as string)
                  }
                  error={"age" in errors}
                  className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-[20rem] "
                />
              )}
            />
            <Controller
              name="knowledge"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  className="!m-0"
                >
                  <InputLabel
                    required
                    sx={{ color: "var(--azul-primario)" }}
                    id="demo-select-small-label"
                  >
                    Como conheceu a feira?
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    className="[&_fieldset]:!border-[var(--azul-primario)] w-[20rem]"
                    label="Como conheceu a feira?"
                  >
                    <MenuItem value="0" disabled>
                      Selecione
                    </MenuItem>
                    {getKnowledgeData?.map((knowledge) => (
                      <MenuItem key={knowledge._id} value={knowledge._id}>
                        {knowledge.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="profile"
              control={control}
              render={({ field }) => (
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  className="!m-0"
                >
                  <InputLabel
                    required
                    sx={{ color: "var(--azul-primario)" }}
                    id="select-profile-label"
                  >
                    Qual perfil você se encaixa?
                  </InputLabel>

                  <Select
                    {...field}
                    labelId="select-profile-label"
                    id="select-profile"
                    size="small"
                    className="[&_fieldset]:!border-[var(--azul-primario)] w-[20rem]"
                    label="Qual perfil você se encaixa?"
                    onChange={(e) => {
                      field.onChange(e);
                      const value = e.target.value;

                      if (value === "2") {
                        // Visitante
                        setIsVisitor(true);
                        setIsFromCompany(false);
                      } else if (value === "3") {
                        // Aluno
                        setIsVisitor(false);
                        setIsFromCompany(false);
                      } else if (value === "1") {
                        // Empresa/colaborador
                        setIsVisitor(false);
                        setIsFromCompany(true);
                      }
                    }}
                  >
                    <MenuItem value="0" disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value="2">Visitante</MenuItem>
                    <MenuItem value="3">Aluno</MenuItem>
                    <MenuItem value="1">Empresa/colaborador</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {!isVisitor && (
              <>
                {isFromCompany ? (
                  // SELECT EMPRESA
                  <Controller
                    name="company"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl size="small" className="!m-0">
                        <InputLabel
                          required
                          sx={{ color: "var(--azul-primario)" }}
                        >
                          Empresa
                        </InputLabel>
                        <Select
                          {...field}
                          className="[&_fieldset]:!border-[var(--azul-primario)] w-[20rem]"
                          label="Empresa"
                        >
                          <MenuItem value="0" disabled>
                            Selecione
                          </MenuItem>
                          {getCompaniesData?.map((company) => (
                            <MenuItem key={company._id} value={company._id}>
                              {company.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                ) : (
                  // SELECT TURMA
                  <Controller
                    name="class"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl size="small" className="!m-0">
                        <InputLabel
                          required
                          sx={{ color: "var(--azul-primario)" }}
                        >
                          Turma
                        </InputLabel>
                        <Select
                          {...field}
                          className="[&_fieldset]:!border-[var(--azul-primario)] w-[20rem]"
                          label="Turma"
                        >
                          <MenuItem value="0" disabled>
                            Selecione
                          </MenuItem>
                          {getClassesData?.map((classe) => (
                            <MenuItem key={classe._id} value={classe._id}>
                              {classe.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                )}
              </>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            type={isLogin ? "submit" : step === 1 ? "button" : "submit"}
            onClick={() => !isLogin && setValue("step", 2)}
            disabled={!isValid}
            className={`${
              isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"
            } w-[20rem]`}
          >
            {isLogin ? "Entrar" : "Próximo"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/inicio`);
            }}
            className="!border-[var(--azul-primario)] !text-[var(--azul-primario)] w-[20rem]"
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
            actions={
              <div className="!flex !flex-col !items-center">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="contained"
                    className="!bg-[var(--azul-primario)] w-[20rem]"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    className="!border-[var(--azul-primario)] w-[20rem] !text-[var(--azul-primario)]"
                  >
                    Voltar
                  </Button>
                </div>
              </div>
            }
          />
        )}

        {alreadySignedUp && (
          <Modal
            openModal={alreadySignedUp}
            closeModal={() => setAlreadySignedUp(false)}
            title="Ops, essa conta ja foi cadastrada"
            subtitle="Deseja entrar nessa conta?"
            actions={
              <div className="!flex !flex-col !items-center">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="contained"
                    className="!bg-[var(--azul-primario)] w-[20rem]"
                    onClick={() => (
                      login({
                        body: {
                          username: getValues("email"),
                          password: getValues("password"),
                        },
                      }),
                      setAlreadySignedUp(false)
                    )}
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setAlreadySignedUp(false);
                    }}
                    className="!border-[var(--azul-primario)] w-[20rem] !text-[var(--azul-primario)]"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            }
          />
        )}
      </form>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={
          loginRest ||
          postCreateUserRest ||
          getClassesPending ||
          getCompaniesPending.isLoading ||
          getKnowledgePending
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
