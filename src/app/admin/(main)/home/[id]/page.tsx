"use client";
import { AdminTitles } from "@/components/AdminTitles";
import { ListCard } from "@/components/ListCard";
import { ProjectsAccordion } from "@/components/ProjectsAccordion";
import { UpsertUserDrawer } from "@/components/UpsertUserDrawer";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";
import { useGetUsers } from "@/service/hooks/useGetUsers";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const path = usePathname();
  const isUsersPage = params.id === "users";
  const [searchByName, setSearchByName] = useState<string>("");
  const [openUpsertUsersDrawer, setOpenUpsertUsersDrawer] =
    useState<boolean>(false);

  const { getUsers, getUsersData, getUsersError, getUsersRest } = useGetUsers({
    enabled: isUsersPage,
    name: searchByName,
  });

  const {
    getExhibitionsData,
    getExhibitions,
    getExhibitionsError,
    getExhibitionsRest,
  } = useGetExhibitions({ enabled: !isUsersPage, name: searchByName });

  useEffect(() => {
    getUsersError && toast.error("erro ao listar usuários");
    getExhibitionsError && toast.error("erro ao listar feiras");
  }, [getUsersError, getExhibitionsError]);

  useEffect(() => {
    !isUsersPage ? getExhibitions() : getUsers();
  }, [searchByName]);

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
              : router.push(path + "/upsert-exhibition/criar")
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
              userType={user.role.name}
            />
          );
        })
      ) : (
        <>
          {getExhibitionsData?.map((exhibition, idx) => (
            <ProjectsAccordion
              key={idx}
              id={exhibition.id}
              title={exhibition.name}
              photo={exhibition.image || ""}
            />
          ))}
        </>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getExhibitionsRest.isLoading || getUsersRest.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {openUpsertUsersDrawer && (
        <UpsertUserDrawer
          open={openUpsertUsersDrawer}
          onClose={() => setOpenUpsertUsersDrawer(false)}
        />
      )}
    </AdminTitles>
  );
}
