"use client";
import { MembersComponent } from "@/components/Members";
import { SwipeableDrawerComponent } from "@/components/SwipeableDrawer";
import { DataContext } from "@/dataContext";
import { useGetProjectById } from "@/service/hooks/useGetProjectById";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePatchFavoriteProject } from "@/service/hooks/usePatchFavoriteProject";
import { Favorite, FavoriteBorder, Grade } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { get } from "http";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";
export default function Page() {
  const { project_id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [isReavaliating, setIsReavaliating] = useState(false);
  const { userId } = useContext(DataContext);

  const {
    getUserById: refreshUser,
    getUserByIdData,
    getUserByIdError,
    getUserByIdPending,
  } = useGetUserById({ user_id: userId || "", enabled: !!userId });
  const favoriteProjects = getUserByIdData?.favorited_projects || [];
  const reviews = getUserByIdData?.reviews || [];

  const { getProjectByIdData, getProjectByIdError, getProjectByIdPending } =
    useGetProjectById({
      project_id: project_id!.toString(),
      enabled: true,
    });
  const {
    patchFavoriteProject,
    patchFavoriteProjectData,
    patchFavoriteProjectError,
    patchFavoriteProjectPending,
  } = usePatchFavoriteProject();

  function favoriteProject() {
    patchFavoriteProject(
      { project_id: project_id?.toString() ?? "" },
      {
        onSuccess: (data) => {
          if (data.data.response === true) {
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
  return (
    <Container maxWidth="sm" className="h-[120vh]">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => history.back()}>
            <ArrowBackIosIcon className="text-[var(--azul-primario)]" />
          </IconButton>
          <h1 className="text-[var(--azul-primario)] font-bold text-[2rem]">
            {getProjectByIdData?.name}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {favoriteProjects.includes(project_id?.toString() ?? "") ? (
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
      <Image
        src={"/images/BackgroundCardProject.png"}
        alt={getProjectByIdData?.name ?? ""}
        width={100}
        height={100}
        className="w-full mb-5 mt-4"
      />
      <p className="text-[var(--text)] text-[.9rem] mb-6">
        {getProjectByIdData?.description}
      </p>
      <h2 className="text-[var(--azul-primario)] font-medium text-center text-2xl mb-2">
        Integrantes
      </h2>
      <MembersComponent
        Class="1° Ano F"
        Members={(getProjectByIdData?.expositors ?? []).map((expositor) => ({
          name: expositor.name || "Nome não disponível",
          photo: expositor.profile_picture,
        }))}
      />
      {!openModal && (
        <div className="bg-[var(--azul-primario)] rounded-t-2xl fixed bottom-0 w-full right-0 h-[8%] flex items-center justify-center z-[9999]">
          <IconButton
            className="!text-center !font-bold !text-3xl !text-white"
            onClick={() => setOpenModal(true)}
          >
            {isReavaliating ? "Reavaliar" : "Avaliar"}
            <KeyboardArrowUpIcon className="ml-3 !text-4xl" />
          </IconButton>
        </div>
      )}
      {openModal && (
        <SwipeableDrawerComponent
          title={isReavaliating ? "Reavaliar" : "Avaliar"}
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
        open={getUserByIdPending || getProjectByIdPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
