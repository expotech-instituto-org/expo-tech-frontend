"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { ListCard, TUserType } from "@/components/ListCard";
import { Modal } from "@/components/Modal";
import { ProjectsAccordion } from "@/components/ProjectsAccordion";
import { UpsertUserDrawer } from "@/components/UpsertUserDrawer";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import { usePostCreateExhibition } from "@/service/hooks/usePutCreateExhibition";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ICreateExhibitionProps {
  name: string;
  startDate: DateTime<boolean> | null;
  endDate: DateTime<boolean> | null;
}

export default function Page() {
  const params = useParams();
  const isUsersPage = params.id === "usuarios";
  const [searchByName, setSearchByName] = useState<string>("");
  const [propsToCreateExhibition, setPropsToCreateExhibition] =
    useState<ICreateExhibitionProps>({
      name: "",
      startDate: null,
      endDate: null,
    });
  const [openCreateExhibitionModal, setOpenCreateExhibitionModal] =
    useState<boolean>(false);
  const [openUpsertUsersDrawer, setOpenUpsertUsersDrawer] =
    useState<boolean>(false);

  const { getUsersData, getUsersError, getUsersPending } = useGetUsers({
    enabled: isUsersPage,
  });

  const {
    getExhibitions,
    getExhibitionsData,
    getExhibitionsError,
    getExhibitionsPending,
  } = useGetExhibitions({ enabled: !isUsersPage });

  const {
    postCreateExhibition,
    postCreateExhibitionData,
    postCreateExhibitionError,
    postCreateExhibitionRest,
  } = usePostCreateExhibition();

  //TODO - Integrar
  function handleSearchProjectByName(name: string) {}

  useEffect(() => {
    getUsersError && toast.error("erro ao listar usuários");
    getExhibitionsError && toast.error("erro ao listar feiras");
    postCreateExhibitionError && toast.error("erro ao criar feira");
    if (postCreateExhibitionData) {
      toast.success("feira criada com sucesso");
      setOpenCreateExhibitionModal(false);
      setTimeout(() => {
        getExhibitions();
      }, 3500);
    }
  }, [
    getUsersError,
    getExhibitionsError,
    postCreateExhibitionError,
    postCreateExhibitionData,
  ]);

  return (
    <AdminTitles
      title={`Gerenciar ${isUsersPage ? "usuários" : "feiras"}`}
      goback
    >
      <div className="flex gap-4 items-center w-full justify-between">
        <TextField
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          label={`Pesquise por ${isUsersPage ? "usuário" : "feira"}`}
          variant="outlined"
          size="small"
          className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] md:w-3/4"
        />
        <Button
          variant="contained"
          className="!w-fit !bg-[var(--azul-primario)]"
          onClick={() =>
            isUsersPage
              ? setOpenUpsertUsersDrawer(true)
              : setOpenCreateExhibitionModal(true)
          }
        >
          Criar {isUsersPage ? "usuário" : "feira"}
        </Button>
      </div>
      {isUsersPage ? (
        getUsersData?.map((user) => {
          return (
            <ListCard
              isUser
              id={user._id!}
              key={user._id}
              photo={user.profile_picture}
              name={user.name || ""}
              email={user.email || ""}
              userType={user.role.name?.toLocaleLowerCase() as TUserType}
            />
          );
        }, <ListCard isUser id={"1"} name={"teste"} email={"teste@"} userType={"administrador"} />)
      ) : (
        <>
          {getExhibitionsData?.map((exhibition) => (
            <ProjectsAccordion
              key={exhibition._id}
              title={exhibition.name}
              photo={exhibition.image}
              searchProjectByName={handleSearchProjectByName}
              project={exhibition.projects.map((project) => ({
                id: project._id,
                name: project.name,
              }))}
            />
          ))}
        </>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={
          postCreateExhibitionRest ||
          (isUsersPage ? getUsersPending : getExhibitionsPending)
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <UpsertUserDrawer
        open={openUpsertUsersDrawer}
        onClose={() => setOpenUpsertUsersDrawer(false)}
      />

      <Modal
        openModal={openCreateExhibitionModal}
        closeModal={() => setOpenCreateExhibitionModal(false)}
        title="Criar feira"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenCreateExhibitionModal(false)}
              className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!propsToCreateExhibition.endDate)
                  return toast.error("data de fim da feira nao pode ser vazia");
                if (!propsToCreateExhibition.startDate)
                  return toast.error(
                    "data de início da feira nao pode ser vazia"
                  );
                if (propsToCreateExhibition.name.trim().length === 0)
                  return toast.error("Nome da feira nao pode ser vazio");

                return postCreateExhibition({
                  body: {
                    name: propsToCreateExhibition?.name,
                    start_date:
                      propsToCreateExhibition?.startDate.toFormat("yyyy-MM-dd"),
                    end_date:
                      propsToCreateExhibition?.endDate.toFormat("yyyy-MM-dd"),
                  },
                });
              }}
              autoFocus
              type="submit"
              className="!bg-[var(--azul-primario)] !text-white"
            >
              Salvar
            </Button>
          </>
        }
      >
        <TextField
          value={propsToCreateExhibition?.name}
          onChange={(e) =>
            setPropsToCreateExhibition({
              ...propsToCreateExhibition,
              name: e.target.value,
            })
          }
          label="Nome da feira"
          variant="outlined"
          size="small"
          className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)] w-full"
        />

        <div className="flex w-full mt-4 gap-4">
          <DatePicker
            className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)]"
            label="Data de início"
            maxDate={
              propsToCreateExhibition.endDate
                ? propsToCreateExhibition.endDate
                : undefined
            }
            value={
              propsToCreateExhibition.startDate
                ? propsToCreateExhibition.startDate
                : null
            }
            format="dd/MM/yyyy"
            onChange={(newValue) =>
              setPropsToCreateExhibition({
                ...propsToCreateExhibition,
                startDate: newValue ? newValue : null,
              })
            }
          />
          <DatePicker
            label="Data final"
            className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)]"
            minDate={
              propsToCreateExhibition.startDate
                ? propsToCreateExhibition.startDate
                : undefined
            }
            value={
              propsToCreateExhibition.endDate
                ? propsToCreateExhibition.endDate
                : null
            }
            format="dd/MM/yyyy"
            onChange={(newValue) =>
              setPropsToCreateExhibition({
                ...propsToCreateExhibition,
                endDate: newValue ? newValue : null,
              })
            }
          />
        </div>
      </Modal>
    </AdminTitles>
  );
}
