"use client";
import ProjectCard from "@/components/projectCard";
import { useGetExhibitionCurrent } from "@/service/hooks/useGetExhibitionsCurrent";
import { useGetProjects } from "@/service/hooks/useGetProjects";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { IGetProjectsResponse } from "@/types/backendTypes";
import {
  Favorite,
  FormatListBulleted,
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
} from "@mui/icons-material";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { DataContext } from "@/dataContext";
import { usePatchFavoriteProject } from "@/service/hooks/usePatchFavoriteProject";
import Carousel from "@/components/Carousel";

export default function Home() {
  const [selected, setSelected] = useState("todos");
  const [avaliados, setAvaliados] = useState(true);
  const [search, setSearch] = useState("");
  const { userId } = useContext(DataContext);

  const {
    getUserById: refreshUser,
    getUserByIdData,
    getUserByIdError,
    getUserByIdPending,
  } = useGetUserById({ user_id: userId || "", enabled: !!userId });
  const favoriteProjects = getUserByIdData?.favorited_projects || [];
  const reviews = getUserByIdData?.reviews || [];

  const { patchFavoriteProject } = usePatchFavoriteProject();

  function favoriteProject(project_id: string) {
    patchFavoriteProject(
      { project_id },
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

  const {
    getProjectsData,
    getProjectsPending,
    getProjectsError,
    getProjects: refetchProjects,
  } = useGetProjects({
    exhibition_id: "exhibition-uuid-1234",
    project_name: search,
  });

  useEffect(() => {
    if (getUserByIdData) {
      refetchProjects();
    }
  }, [getUserByIdData]);

  useEffect(() => {
    if (getProjectsError) toast.error("Erro ao listar projetos");
  }, [getProjectsError]);

  const filteredProjects = getProjectsData?.filter(
    (project: IGetProjectsResponse) => {
      if (selected === "todos") return true;
      if (selected === "favoritos")
        return favoriteProjects.includes(project._id);
      if (selected === "avaliados" && avaliados)
        return reviews.some((review) => review.project_id === project._id);
      if (selected === "avaliados" && !avaliados)
        return !reviews.some((review) => review.project_id === project._id);
      return true;
    }
  );

  return (
    <div>
      {/* Cabeçalho */}
      <div className="bg-[url(/images/Cabeçalho.png)] w-full h-[9.31rem] bg-fixed fixed top-0 left-0">
        <div className="absolute">
          <p className="text-[1.25rem] ml-[0.94rem] mt-[2.5rem]">
            Bem-vindo(a) à
          </p>
          <h1 className="text-[3rem] font-bold ml-[0.94rem] mt-[-0.31rem]">
            Expo360
          </h1>
        </div>
      </div>

      <div className="pt-[9.31rem]">
        {/* Banner */}
        <Carousel />

        {/* Botões principais */}
        <div className="mt-[0.88rem] flex justify-between px-[1.19rem]">
          <Button
            className="!bg-[var(--azul-primario)] w-[48%] !rounded-[0.625rem]"
            variant="contained"
          >
            <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
          </Button>
          <Button
            className="!bg-[var(--azul-primario)] w-[48%] !rounded-[0.625rem]"
            variant="contained"
          >
            <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
          </Button>
        </div>

        {/* Barra de busca */}
        <div className="flex items-center justify-between w-[23.38rem] h-[2.5rem] bg-white border border-gray-300 rounded-[0.625rem] mt-[0.63rem] ml-[1.19rem] px-[0.63rem] shadow-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar grupo"
            className="w-full outline-none text-[0.875rem]"
          />
          <Search className="text-gray-500" />
        </div>

        {/* Filtros */}
        <div className="flex justify-around items-center w-[23.38rem] mt-[1rem] text-[0.875rem] font-medium ml-[1.19rem]">
          <button
            onClick={() => setSelected("todos")}
            className="flex items-center pb-[0.25rem] hover:opacity-80 transition"
          >
            <FormatListBulleted className="mr-[0.25rem] text-[var(--azul-primario)]" />
            <span
              className={`${
                selected === "todos"
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)]"
                  : "text-[var(--azul-primario)]/50"
              }`}
            >
              Todos
            </span>
          </button>

          <button
            onClick={() => {
              if (selected === "avaliados") setAvaliados(!avaliados);
              setSelected("avaliados");
            }}
            className="flex items-center pb-[0.25rem] hover:opacity-80 transition"
          >
            {avaliados ? (
              <Star className="mr-[0.25rem] text-[var(--amarelo)]" />
            ) : (
              <StarBorderOutlined className="mr-[0.25rem] text-[var(--amarelo)]" />
            )}
            <span
              className={`${
                selected === "avaliados"
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)]"
                  : "text-[var(--azul-primario)]/50"
              }`}
            >
              {avaliados ? "Já Avaliados" : "Não Avaliados"}
            </span>
          </button>

          <button
            onClick={() => setSelected("favoritos")}
            className="flex items-center pb-[0.25rem] hover:opacity-80 transition"
          >
            <Favorite className="mr-[0.25rem] text-[var(--error)]" />
            <span
              className={`${
                selected === "favoritos"
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)]"
                  : "text-[var(--azul-primario)]/50"
              }`}
            >
              Favoritos
            </span>
          </button>
        </div>

        {/* Lista de projetos */}
        <div className="mx-4 mt-4 ml-[1.19rem] grid grid-cols-1 gap-4">
          {!getProjectsPending &&
            !getProjectsError &&
            filteredProjects?.length === 0 && <p>Nenhum projeto encontrado.</p>}

          {!getProjectsPending &&
            !getProjectsError &&
            filteredProjects?.map((project: IGetProjectsResponse) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                subtitle={project.company_name}
                imageUrl={project.logo || "/images/exampleProjectImage.jpg"}
                favorited={favoriteProjects.includes(project._id) ?? false}
                onFavoriteToggle={() => favoriteProject(project._id)}
                rated={
                  reviews.some((review) => review.project_id === project._id) ??
                  false
                }
              />
            ))}
        </div>
      </div>

      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getProjectsPending || getUserByIdPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
