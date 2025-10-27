"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { Modal } from "@/components/Modal";
import {
  TUpsertExhibitionSchema,
  upsertExhibitionSchema,
} from "@/schemas/upsertExhibition";
import { usePostCreateExhibition } from "@/service/hooks/usePutCreateExhibition";
import { IUpdateExhibitionBody } from "@/types/backendTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ITableProps {
  open?: boolean;
  name: string;
  weight: string;
}

export default function Page() {
  const params = useParams<{ id: string; metodo: string }>();
  const router = useRouter();
  const isUpdate = params.metodo.split("_")[0] === "editar";
  const exhibitionId = isUpdate ? params.metodo.split("_")[1] : null;
  const [openCriteriaModal, setOpenCriteriaModal] = useState<boolean>(false);
  const [newCriteria, setNewCriteria] = useState<ITableProps>({
    name: "",
    weight: "",
  });
  const [openExcludeCriteriaModal, setOpenExcludeCriteriaModal] =
    useState<ITableProps>({
      open: false,
      name: "",
      weight: "",
    });

  const {
    postCreateExhibition,
    postCreateExhibitionData,
    postCreateExhibitionError,
    postCreateExhibitionRest,
  } = usePostCreateExhibition();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TUpsertExhibitionSchema>({
    resolver: zodResolver(upsertExhibitionSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<TUpsertExhibitionSchema> = (data) => {
    if (!exhibitionId) {
      return postCreateExhibition({
        body: {
          name: data.name,
          description: data.description,
          image: data.image.name,
          criteria: data.criteria.map((c) => ({
            name: c.name,
            weight: Number(c.weight),
          })),
          end_date: data.end_date.toFormat("yyyy-MM-dd"),
          start_date: data.start_date.toFormat("yyyy-MM-dd"),
        },
      });
    }
  };

  const handleSetFormData = (data: IUpdateExhibitionBody) => {
    // const formData: TUpsertProjectSchema = {
    //   name: data.name,
    //   company_name: data.company_name,
    //   coordinates: data.coordinates,
    //   description: data.description,
    //   images: data.images.map((imageName: string) => {
    //     const file = new File([], imageName, { type: "image/jpeg" });
    //     return file;
    //   }),
    //   participants: data.expositors,
    // };

    // Object.keys(formData).forEach((field) => {
    //   setValue(
    //     field as keyof TUpsertProjectSchema,
    //     formData[field as keyof TUpsertProjectSchema]
    //   );
    // });
    console.log(data);
  };

  // useEffect(() => {
  //   if (!getProjectByIdData) return;

  //   handleSetFormData(getProjectByIdData);
  // }, [getProjectByIdData]);

  function handleExcludeCriteria(name: string, weight: string) {
    setValue(
      "criteria",
      getValues("criteria").filter(
        (c) => c.name !== name && c.weight !== weight
      )
    );
  }

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    console.log(errors);
    if (errors.criteria) {
      toast.error("Adicione ao menos um critério de avaliação.");
    }
    if (errors.image) {
      toast.error("Adicione uma logo para a feira.");
    }
    postCreateExhibitionError &&
      toast.error("Erro ao criar feira, " + postCreateExhibitionError);
    if (postCreateExhibitionData) {
      toast.success("Feira criada com sucesso");
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  }, [errors, postCreateExhibitionError, postCreateExhibitionData]);

  return (
    <AdminTitles
      title={`${isUpdate ? "Editar" : "Criar"} feira`}
      subtitle={`Preencha os campos abaixo para a ${
        isUpdate ? "edição" : "criação"
      } da feira`}
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
              placeholder="Digite o nome da feira"
              label="Nome da feira"
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
              className="!w-full border-1 border-[var(--azul-primario)] border-solid p-2 !rounded-[.5rem] !text-[var(--azul-primario)] "
              placeholder="Descrição"
              {...field}
              aria-label="Descrição"
              minRows={5}
              style={{ width: 200 }}
            />
          )}
        />

        <div className="flex w-full justify-between gap-4">
          <Controller
            control={control}
            defaultValue={DateTime.now()}
            name="start_date"
            render={({ field }) => (
              <DatePicker
                className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)] w-1/2 [&_button]:!text-[var(--azul-primario)]"
                label="Data de início *"
                maxDate={watch("end_date")}
                format="dd/MM/yyyy"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={DateTime.now()}
            name="end_date"
            render={({ field }) => (
              <DatePicker
                label="Data final *"
                {...field}
                className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)] w-1/2 [&_button]:!text-[var(--azul-primario)]"
                minDate={watch("start_date")}
                format="dd/MM/yyyy"
              />
            )}
          />
        </div>

        <div className="w-full flex items-center justify-between">
          <h2 className=" mt-4 text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.9rem]">
            Critérios de avaliação
            <span className="text-[var(--error)]"> *</span>
          </h2>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpenCriteriaModal(true)}
            className="!bg-[var(--azul-primario)] !text-white"
          >
            Adicionar critérios
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="!bg-[var(--azul-primario)] ">
              <TableRow>
                <TableCell className="!text-[var(--background)] !py-2 !text-center">
                  Nome
                </TableCell>
                <TableCell className="!text-[var(--background)] !text-center !py-2">
                  Peso
                </TableCell>
                <TableCell className="!text-[var(--background)] !text-center !py-2">
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getValues("criteria") &&
                getValues("criteria").map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="!text-center !py-2"
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className="!text-center !py-2">
                      {row.weight}
                    </TableCell>
                    <TableCell
                      className="!text-center !py-2"
                      component="th"
                      scope="row"
                    >
                      <IconButton
                        onClick={() =>
                          setOpenExcludeCriteriaModal({
                            open: true,
                            name: row.name,
                            weight: row.weight,
                          })
                        }
                      >
                        <DeleteOutlineIcon className="!text-[var(--azul-primario)]" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h2 className="mt-4 text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.9rem]">
          Logo <span className="text-[var(--error)]">*</span>
        </h2>

        <div className="flex flex-col gap-2">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  className="!bg-[var(--azul-primario)] !text-white"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload da logo
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute bottom-0 left-0 w-px h-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)] [clip-path:inset(50%)]"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        alert(
                          "Apenas arquivos de imagem são permitidos (jpg, png, webp, jpeg)."
                        );
                        e.target.value = "";
                        return;
                      }

                      if (file.size > 10 * 1024 * 1024) {
                        alert(`O arquivo excede ${10}MB.`);
                        e.target.value = "";
                        return;
                      }

                      field.onChange(file);
                      e.target.value = "";
                    }}
                  />
                </Button>

                {/* Mostra o arquivo selecionado */}
                {field.value && (
                  <div className="flex items-center justify-between bg-[var(--azul20)] text-[var(--azul-primario)] font-[600] rounded px-2 py-1 mt-2">
                    <span>
                      {field.value.name} (
                      {(field.value.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <IconButton
                      size="small"
                      className="!text-[var(--azul-primario)]"
                      onClick={() => field.onChange(null)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
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

      <Modal
        openModal={openCriteriaModal}
        closeModal={() => setOpenCriteriaModal(false)}
        title="Adicionar critérios"
        subtitle="Adicione os critérios da feira"
        actions={
          <div className="flex w-full gap-4 justify-end">
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenCriteriaModal(false)}
              className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
            >
              Cancelar
            </Button>
            <Button
              size="small"
              variant="contained"
              autoFocus
              type="submit"
              onClick={() => {
                if (newCriteria.name.trim().length <= 2) {
                  return toast.error(
                    "O nome do critério deve ter mais de 2 caracteres."
                  );
                } else if (Number(newCriteria.weight) === 0) {
                  return toast.error(
                    "O peso do critério deve ser maior que 0."
                  );
                } else {
                  if (!getValues("criteria")) {
                    console.log("toaqui");
                    setValue("criteria", [newCriteria]);
                  } else {
                    setValue("criteria", [
                      ...getValues("criteria"),
                      newCriteria,
                    ]);
                  }

                  setNewCriteria({ name: "", weight: "" });
                  setOpenCriteriaModal(false);
                }
              }}
              className="!bg-[var(--azul-primario)] !text-white"
            >
              Criar
            </Button>
          </div>
        }
      >
        <TextField
          required
          value={newCriteria.name}
          onChange={(e) =>
            setNewCriteria({ ...newCriteria, name: e.target.value })
          }
          size="small"
          placeholder="Nome do critério"
          label="Nome do critério"
          type="string"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] !pr-4 "
        />
        <TextField
          required
          value={newCriteria.weight}
          onChange={(e) =>
            setNewCriteria({ ...newCriteria, weight: e.target.value })
          }
          size="small"
          placeholder="Peso do critério"
          label="Peso do critério"
          type="number"
          variant="outlined"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)]  "
        />
      </Modal>

      <Modal
        openModal={openExcludeCriteriaModal.open!}
        closeModal={() =>
          setOpenExcludeCriteriaModal({ open: false, name: "", weight: "" })
        }
        title="Excluir critério"
        subtitle="Tem certeza que deseja excluir este critério?"
        actions={
          <div className="flex w-full gap-4 justify-end">
            <Button
              size="small"
              variant="outlined"
              onClick={() =>
                setOpenExcludeCriteriaModal({
                  open: false,
                  name: "",
                  weight: "",
                })
              }
              className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
            >
              Cancelar
            </Button>
            <Button
              size="small"
              variant="contained"
              autoFocus
              type="submit"
              onClick={() => {
                handleExcludeCriteria(
                  openExcludeCriteriaModal.name,
                  openExcludeCriteriaModal.weight
                );
                setOpenExcludeCriteriaModal({
                  open: false,
                  name: "",
                  weight: "",
                });
              }}
              className="!bg-[var(--azul-primario)] !text-white"
            >
              Criar
            </Button>
          </div>
        }
      />

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={postCreateExhibitionRest}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AdminTitles>
  );
}
