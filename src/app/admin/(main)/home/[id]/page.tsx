"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { UpsertUserDrawer } from "@/components/UpsertUserDrawer";
import { TUserType, ListCard } from "@/components/ListCard";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProjectsAccordion } from "@/components/ProjectsAccordion";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";

export default function Page() {
  const params = useParams();
  const isUsersPage = params.id === "usuarios";
  const [searchByName, setSearchByName] = useState<string>("");
  const [openUpsertUsersDrawer, setOpenUpsertUsersDrawer] =
    useState<boolean>(false);

  const { getUsersData, getUsersError, getUsersPending } = useGetUsers({
    enabled: isUsersPage,
  });

  const { getExhibitionsData, getExhibitionsError, getExhibitionsPending } =
    useGetExhibitions({ enabled: !isUsersPage });

  useEffect(() => {
    getUsersError && toast.error("erro ao listar usuários");
    getExhibitionsError && toast.error("erro ao listar feiras");
  }, []);

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
          onClick={() => isUsersPage && setOpenUpsertUsersDrawer(true)}
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
        open={isUsersPage ? getUsersPending : getExhibitionsPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <UpsertUserDrawer
        open={openUpsertUsersDrawer}
        onClose={() => setOpenUpsertUsersDrawer(false)}
      />
    </AdminTitles>
  );
}
