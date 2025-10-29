"use client";
import { editUserSchema, TEditUserSchema } from "@/schemas/editUserSchema";
import { useGetClasses } from "@/service/hooks/useGetClasses";
import { useGetCompanies } from "@/service/hooks/useGetCompanies";
import { useGetProjects } from "@/service/hooks/useGetProjects";
import { useGetRoles } from "@/service/hooks/useGetRoles";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePostCreateUser } from "@/service/hooks/usePostCreateUser";
import { usePutUpdateUser } from "@/service/hooks/usePutUpdateUser";
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
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { isValid, errors },
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { getUserByIdData, getUserByIdError, getUserByIdPending } =
    useGetUserById({ user_id: props.userId!, enabled: !!props.userId });

  const {
    postCreateUser,
    postCreateUserData,
    postCreateUserError,
    postCreateUserRest,
  } = usePostCreateUser();

  const { getRolesData, getRolesPending } = useGetRoles({
    enabled: true,
  });

  const { getCompaniesData, getCompaniesError, getCompaniesPending } =
    useGetCompanies({
      enabled: true,
    });

  const { getProjectsData, getProjectsError, getProjectsPending } =
    useGetProjects({ enabled: watch("role") === "Cliente" });

  const {
    putUpdateUser,
    putUpdateUserData,
    putUpdateUserError,
    putUpdateUserRest,
  } = usePutUpdateUser();

  const { getClassesData, getClassesError, getClassesPending } = useGetClasses({
    enabled: true,
  });

  const handleClose = () => {
    reset();
    props.onClose();
  };

  const onSubmit: SubmitHandler<TEditUserSchema> = (data) => {
    if (props.userId) {
      return putUpdateUser({
        body: {
          email: data.email,
          password: data.password,
          role: {
            _id: String(data.role),
            name: String(data.role),
          },
          age: Number(data.age),
          class: String(data.class),
          name: data.name,
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
        name: data.name,
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
      name: data.name,
      company: data.company || "",
      project: data.project?.name || "",
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
    putUpdateUserError && toast.error("Erro ao atualizar usuário");
    putUpdateUserData && toast.success("Usuário atualizado com sucesso!");
    postCreateUserError && toast.error("Erro ao criar usuário");
    postCreateUserData && toast.success("Usuário criado com sucesso!");
    getClassesError && toast.error("Erro ao buscar turmas");
    getCompaniesError && toast.error("Erro ao buscar empresas");
    getProjectsError && toast.error("Erro ao buscar projetos");
  }, [
    getUserByIdError,
    putUpdateUserError,
    putUpdateUserData,
    postCreateUserError,
    postCreateUserData,
    getClassesError,
    getProjectsError,
    getCompaniesError,
  ]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle
        className="!text-[var(--azul-primario)] !font-bold"
        id="alert-dialog-title"
      >
        {props.userId ? "Editar" : "Criar"} Usuário
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6 !pt-3">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.name?.message}
              size="small"
              label="Nome"
              type="string"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.email?.message}
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
            placeholder="Nó mínimo 5 caracteres"
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
                className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                id="demo-select-small-label"
                {...field}
                label="Cargo"
              >
                {getRolesData?.length === 0 ? (
                  <MenuItem disabled key={"0"} value={"0"}>
                    Cargos não encontrados
                  </MenuItem>
                ) : (
                  getRolesData?.map((role) => (
                    <MenuItem key={role._id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
        </FormControl>

        {/* Mostrar campo de empresa */}
        {(watch("role") === "cliente" || watch("role") === "colaborador") && (
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
            className="!m-0"
          >
            <InputLabel
              {...register("company")}
              id="demo-select-small-label"
              sx={{
                color: "var(--azul-primario)",
              }}
            >
              Empresa
            </InputLabel>
            <Controller
              name="company"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Select
                  className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                  id="demo-select-small-label"
                  {...field}
                  label="Empresa"
                >
                  {getCompaniesData?.length === 0 ? (
                    <MenuItem disabled key={"0"} value={"0"}>
                      Empresas não encontradas
                    </MenuItem>
                  ) : (
                    getCompaniesData?.map((company) => (
                      <MenuItem key={company._id} value={company.name}>
                        {company.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              )}
            />
          </FormControl>
        )}

        {/* Mostrar campo de idade */}
        {watch("role") !== "admin" && (
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
        )}

        {/* Mostrar campo de turma */}
        {watch("role") === "expositor" ||
          (watch("role") === "aluno" && (
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              className="!m-0"
            >
              <InputLabel
                {...register("class")}
                id="demo-select-small-label"
                sx={{
                  color: "var(--azul-primario)",
                }}
                required
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
                    {getClassesData?.length === 0 ? (
                      <MenuItem disabled key={"0"} value={"0"}>
                        Turmas não encontradas
                      </MenuItem>
                    ) : (
                      getClassesData?.map((classe) => (
                        <MenuItem key={classe._id} value={classe._id}>
                          {classe.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
            </FormControl>
          ))}

        {/* Mostrar campo de projeto */}
        {watch("role") === "cliente" && (
          <Controller
            name="project"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Select
                multiple
                {...register("project")}
                className=" [&_fieldset]:!border-[var(--azul-primario)]    "
                id="demo-select-small-label"
                value={field.value}
                onChange={field.onChange}
                label="Projeto"
              >
                {getProjectsData?.length === 0 ? (
                  <MenuItem disabled key={"0"} value={"0"}>
                    Empresas não encontradas
                  </MenuItem>
                ) : (
                  getProjectsData?.map((classe) => (
                    <MenuItem key={classe._id} value={classe._id}>
                      {classe.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
        )}

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={
            getUserByIdPending ||
            getCompaniesPending ||
            getClassesPending ||
            getProjectsPending ||
            getRolesPending ||
            props.userId
              ? putUpdateUserRest
              : postCreateUserRest
          }
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
          type="submit"
          className={`${isValid ? "!bg-[var(--azul-primario)]" : "!bg-gray"}`}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
