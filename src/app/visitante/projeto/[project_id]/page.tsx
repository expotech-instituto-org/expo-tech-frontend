"use client";
import Carousel from "@/components/Carousel";
import { MembersComponent } from "@/components/Members";
import { SwipeableDrawerComponent } from "@/components/SwipeableDrawer";
import { DataContext } from "@/dataContext";
import { useGetProjectById } from "@/service/hooks/useGetProjectById";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePatchFavoriteProject } from "@/service/hooks/usePatchFavoriteProject";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
export default function Page() {
  const { project_id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { userId, exhibitionId } = useContext(DataContext);
  const {
    getUserById: refreshUser,
    getUserByIdData,
    getUserByIdError,
    getUserByIdPending,
  } = useGetUserById({ user_id: userId, enabled: true });

  const { getProjectByIdData, getProjectByIdError, getProjectByIdPending } =
    useGetProjectById({
      project_id: project_id!.toString(),
      enabled: true,
    });

  const {
    patchFavoriteProject,
    patchFavoriteProjectError,
    patchFavoriteProjectPending,
  } = usePatchFavoriteProject();

  const isFavorited = getUserByIdData?.favorited_projects!.find(
    (item) => item === project_id
  );

  const isReviewed = getUserByIdData?.reviews!.find(
    (item) => item.project_id === project_id
  );

  function favoriteProject() {
    patchFavoriteProject(
      { project_id: project_id?.toString() ?? "" },
      {
        onSuccess: (data) => {
          if (data.data === true) {
            toast.success("Projeto favoritado com sucesso!");
          } else {
            toast.success("Projeto desfavoritado com sucesso!");
          }
          refreshUser();
        },
        onError: () => {
          toast.error("Erro ao atualizar favorito");
        },
      }
    );
  }

  useEffect(() => {
    getUserByIdError && toast.error("Erro ao pegar dados do usuário");
    patchFavoriteProjectError && toast.error("Erro ao atualizar favorito");
    getProjectByIdError && toast.error("Erro ao pegar dados do projeto");
  }, [getUserByIdError, patchFavoriteProjectError, getProjectByIdError]);

  return (
    <div className="flex flex-col">
      <Container maxWidth="sm" className="h-[90vh]">
        <div className="flex items-center justify-between pt-3 mb-8">
          <div className="flex items-center gap-2">
            <IconButton onClick={() => history.back()}>
              <ArrowBackIosIcon className="text-[var(--azul-primario)]" />
            </IconButton>
            <h1 className="text-[var(--azul-primario)] font-bold text-[2rem]">
              {getProjectByIdData?.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {isFavorited ? (
              <Favorite
                className="text-[var(--error)]"
                onClick={() => favoriteProject()}
              />
            ) : (
              <FavoriteBorder
                className={`text-[var(--error)] `}
                onClick={() => favoriteProject()}
              />
            )}
            <Avatar sx={{ width: 24, height: 24 }} />
          </div>
        </div>
        <Carousel
          images={getProjectByIdData ? getProjectByIdData.images : [""]}
        />
        <p className="text-[var(--text)] text-[.9rem] mb-6">
          {getProjectByIdData?.description}
        </p>
        <h2 className="text-[var(--azul-primario)] font-medium text-center text-2xl mb-2">
          Integrantes
        </h2>
        <MembersComponent
          Members={(getProjectByIdData?.expositors ?? []).map((expositor) => ({
            name: expositor.name || "Nome não disponível",
            photo: expositor.profile_picture,
            Class: expositor.class,
          }))}
        />
      </Container>
      {!openModal && (
        <div className="bg-[var(--azul-primario)] rounded-t-2xl  w-full  h-[10vh] flex items-center justify-center">
          <IconButton
            className="!text-center !font-bold !text-3xl !text-white"
            onClick={() => setOpenModal(true)}
          >
            {isReviewed ? "Reavaliar" : "Avaliar"}
            <KeyboardArrowUpIcon className="ml-3 !text-4xl" />
          </IconButton>
        </div>
      )}
      {openModal && (
        <SwipeableDrawerComponent
          exhibitionId={exhibitionId}
          title={isReviewed ? "Reavaliar" : "Avaliar"}
          subtitle="Com base no que você viu do projeto, avaliar:"
          question={[
            {
              description: "Como foi a organização do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a ideia do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a apresentação do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a execução do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Deixe um comentário para o grupo",
              responseType: "Comment",
              isRequired: false,
            },
          ]}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={
          getUserByIdPending ||
          getProjectByIdPending ||
          patchFavoriteProjectPending
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
