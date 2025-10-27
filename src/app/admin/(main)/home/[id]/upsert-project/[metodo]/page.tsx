"use client";

import { AdminTitles } from "@/components/AdminTitles";
import {
  TUpsertProjectSchema,
  upsertProjectSchema,
} from "@/schemas/upsertProject";
import { useGetProjectById } from "@/service/hooks/useGetProjectById";
import { usePostCreateProject } from "@/service/hooks/usePostCreateProject";
import { usePutUpdateProject } from "@/service/hooks/useUpdateProject";
import { IGetProjectsResponse } from "@/types/backendTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const params = useParams<{ id: string; metodo: string }>();
  const router = useRouter();
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number | null>(
    null
  );
  const isUpdate = params.metodo.split("_")[0] === "editar";
  const exhibitionId = params.metodo.split("_")[1];
  const projectId = isUpdate ? params.metodo.split("_")[2] : null;

  const { getProjectByIdData, getProjectByIdError, getProjectByIdPending } =
    useGetProjectById({
      project_id: projectId!,
      enabled: isUpdate,
    });

  const {
    putUpdateProject,
    putUpdateProjectData,
    putUpdateProjectError,
    putUpdateProjectRest,
  } = usePutUpdateProject();

  const {
    postCreateProject,
    postCreateProjectData,
    postCreateProjectError,
    postCreateProjectRest,
  } = usePostCreateProject();

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TUpsertProjectSchema>({
    resolver: zodResolver(upsertProjectSchema),
    defaultValues: {
      name: "",
      images: [],
      participants: [],
    },
  });

  const onSubmit: SubmitHandler<TUpsertProjectSchema> = (data) => {
    if (selectedLogoIndex === null)
      return toast.error("Selecione uma imagem como logo do projeto");
    else {
      if (isUpdate) {
        return toast.success("Projeto atualizado com sucesso");
      }

      postCreateProject({
        body: {
          name: data.name,
          company_name: data.name,
          description: data.description,
          images: data.images.map((file) => file.name),
          expositors: data.participants.map((participant) => {
            return {
              id: participant,
            };
          }),
          coordinates: Number(data.coordinates),

          logo: data.images[selectedLogoIndex].name,
          exhibition_id: exhibitionId,
        },
      });
    }
  };

  const handleSetFormData = (data: IGetProjectsResponse) => {
    const formData: TUpsertProjectSchema = {
      name: data.name,
    };

    Object.keys(formData).forEach((field) => {
      setValue(
        field as keyof TUpsertProjectSchema,
        formData[field as keyof TUpsertProjectSchema]
      );
    });
  };

  useEffect(() => {
    if (!getProjectByIdData) return;

    handleSetFormData(getProjectByIdData);
  }, [getProjectByIdData]);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    errors.participants && toast.error(errors.participants.message || "");
    errors.images && toast.error(errors.images.message || "");
    errors.description && toast.error(errors.description.message);
    postCreateProjectError && toast.error("erro ao criar projeto");
    putUpdateProjectError && toast.error("erro ao atualizar projeto");
    postCreateProjectData && toast.success("Projeto criado com sucesso");
    putUpdateProjectData && toast.success("Projeto atualizado com sucesso");
    getProjectByIdError && toast.error("erro ao buscar projeto");
  }, [
    errors,
    postCreateProjectError,
    putUpdateProjectError,
    postCreateProjectData,
    putUpdateProjectData,
    getProjectByIdError,
  ]);

  return (
    <AdminTitles
      title={`${isUpdate ? "Editar" : "Criar"} projeto`}
      subtitle={`Preencha os campos abaixo para a ${
        isUpdate ? "edição" : "criação"
      } do projeto`}
      goback
    >
      <div className="flex w-full flex-col gap-6">
        <h2 className=" mt-4 text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.9rem]">
          Informações
        </h2>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              required
              {...field}
              helperText={errors.name?.message}
              size="small"
              placeholder="Digite o nome do projeto"
              label="Nome do projeto"
              type="string"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
            />
          )}
        />

        <Controller
          name="company_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              required
              {...field}
              helperText={errors.name?.message}
              size="small"
              placeholder="Digite o nome da empresa"
              label="Nome da empresa"
              type="string"
              variant="outlined"
              className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextareaAutosize
              required
              id="description"
              className="!w-full border-1 border-[var(--azul-primario)] border-solid p-2 !rounded-[.5rem] !text-[var(--azul-primario)]"
              placeholder="Descrição *"
              {...field}
              aria-label="Descrição *"
              minRows={5}
              style={{ width: 200 }}
            />
          )}
        />

        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            className="!text-[var(--azul-primario)]  "
          >
            Participantes
          </InputLabel>
          <Controller
            defaultValue={[]}
            name="participants"
            control={control}
            render={({ field }) => (
              <Select
                required
                multiple
                className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...field}
                label="Participantes *"
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            )}
          ></Controller>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            className="!text-[var(--azul-primario)]  "
          >
            Coordenadores
          </InputLabel>
          <Controller
            defaultValue={""}
            name="coordinates"
            control={control}
            render={({ field }) => (
              <Select
                required
                className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...field}
                label="Coordenadores *"
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            )}
          ></Controller>
        </FormControl>
        <h2 className="mt-4 text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.9rem]">
          Imagens <span className="text-[var(--error)]">*</span>
        </h2>

        <div className="flex flex-col gap-2">
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  className="!bg-[var(--azul-primario)] !text-white"
                  startIcon={<CloudDownloadOutlinedIcon />}
                >
                  Faça upload
                  <input
                    required
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute bottom-0 left-0 w-px h-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)] [clip-path:inset(50%)]"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const validFiles = files.filter(
                        (file) => file.size <= 10 * 1024 * 1024
                      );

                      if (validFiles.length !== files.length) {
                        alert(
                          `Alguns arquivos foram ignorados (máx. ${10}MB cada).`
                        );
                      }
                      const combined = [
                        ...getValues("images"),
                        ...validFiles,
                      ].slice(0, 5);

                      if (combined.length > 5) {
                        alert(`Você só pode enviar até ${5} arquivos.`);
                      }

                      setValue("images", combined);
                      field.onChange(combined);

                      e.target.value = "";
                    }}
                  />
                </Button>

                {watch("images") && watch("images").length > 0 && (
                  <>
                    <h2 className="mt-4 text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.9rem]">
                      Selecione um dos arquivos para ser usado como logo do
                      projeto
                    </h2>
                    {getValues("images").length > 0 &&
                      getValues("images").map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-[var(--azul20)] text-[var(--azul-primario)] font-[600] rounded px-2 py-1"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedLogoIndex === i}
                              onChange={() =>
                                setSelectedLogoIndex((prev) =>
                                  prev === i ? null : i
                                )
                              }
                              sx={{
                                color: "var(--azul-primario)",
                                "&.Mui-checked": {
                                  color: "var(--azul-primario)",
                                },
                              }}
                            />
                            <span>
                              {file.name} (
                              {(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <IconButton
                            size="small"
                            className="!text-[var(--azul-primario)]"
                            onClick={() => {
                              const updated = getValues("images").filter(
                                (_, idx) => idx !== i
                              );
                              setValue("images", updated);
                              field.onChange(updated);

                              // Se o arquivo removido for o selecionado, reseta a seleção
                              if (selectedLogoIndex === i) {
                                setSelectedLogoIndex(null);
                              } else if (
                                selectedLogoIndex !== null &&
                                selectedLogoIndex > i
                              ) {
                                // Ajusta o índice se removido arquivo anterior ao selecionado
                                setSelectedLogoIndex(selectedLogoIndex - 1);
                              }
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </div>
                      ))}
                  </>
                )}
              </>
            )}
          />
        </div>

        <div className="flex w-full gap-4 justify-end">
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.back()}
            className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
          >
            Cancelar
          </Button>
          <Button
            size="small"
            variant="contained"
            autoFocus
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="!bg-[var(--azul-primario)] !text-white"
          >
            {isUpdate ? "Salvar" : "Criar"}
          </Button>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={
          postCreateProjectRest ||
          putUpdateProjectRest ||
          (isUpdate ? getProjectByIdPending : false)
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AdminTitles>
  );
}
