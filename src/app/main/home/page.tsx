"use client";
import ProjectCard from "@/components/projectCard";
import { useGetExhibitionCurrent } from "@/service/hooks/useGetExhibitionsCurrent";
import { useGetProjects } from "@/service/hooks/useGetProjects";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { IGetProjectsResponse } from "@/types/backendTypes";
import { Button } from "@mui/material";
import {
  Favorite,
  FormatListBulleted,
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
} from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home({ userId }: { userId: string | null }) {
  const [selected, setSelected] = useState("todos");
  const [search, setSearch] = useState("");

  const { getUserByIdData, getUserByIdError, getUserByIdPending } =
    useGetUserById({ user_id: userId || "", enabled: !!userId });
  console.log(getUserByIdData?._id);
  const favoriteProjects = getUserByIdData?.favorited_projects || [];

  const {
    getExhibitionCurrentData,
    getExhibitionCurrentError,
    getExhibitionCurrentPending,
  } = useGetExhibitionCurrent({ enabled: true });

  const {
    getProjectsData,
    getProjectsPending,
    getProjectsError,
    getProjects: refetchProjects,
  } = useGetProjects({
    exhibition_id: getExhibitionCurrentData?._id || "",
    project_name: search,
  });

  useEffect(() => {
    if (getExhibitionCurrentData?._id) {
      refetchProjects();
    }
  }, [getExhibitionCurrentData?._id, search, refetchProjects]);

  useEffect(() => {
    if (getProjectsError) toast.error("Erro ao listar projetos");
    if (getExhibitionCurrentError) toast.error("Erro ao obter feira atual");
  }, [getProjectsError, getExhibitionCurrentError]);

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
        <Button
          variant="contained"
          color="primary"
          className="absolute top-4 right-[-50]"
          onClick={() => {}}
        >
          Logout
        </Button>
      </div>

      <div className="pt-[9.31rem]">
        {/* Banner */}
        <div className="bg-black w-[23rem] h-[11.06rem] mt-[0.94rem] ml-[1.38rem] mr-[1.38rem] rounded-[0.625rem]" />

        {/* Botões principais */}
        <div className="mt-[0.88rem] flex">
          <button className="flex items-center justify-center w-[11.38rem] h-[2.25rem] bg-[var(--azul-primario)] rounded-[0.625rem] ml-[1.19rem] text-white font-medium hover:opacity-90">
            <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
          </button>
          <button className="flex items-center justify-center w-[11.38rem] h-[2.25rem] bg-[var(--azul-primario)] rounded-[0.625rem] ml-[0.63rem] text-white font-medium hover:opacity-90">
            <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
          </button>
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
            className="flex items-center pb-[0.25rem] border-b-2 border-transparent hover:opacity-80 transition"
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
            onClick={() => setSelected("avaliados")}
            className="flex items-center pb-[0.25rem] border-b-2 border-transparent hover:opacity-80 transition"
          >
            <Star className="mr-[0.25rem] text-[var(--amarelo)]" />
            <span
              className={`${
                selected === "avaliados"
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)]"
                  : "text-[var(--azul-primario)]/50"
              }`}
            >
              Já Avaliados
            </span>
          </button>

          <button
            onClick={() => setSelected("favoritos")}
            className="flex items-center pb-[0.25rem] border-b-2 border-transparent hover:opacity-80 transition"
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
        <div className="mt-4 ml-[1.19rem] grid grid-cols-1 gap-4">
          {!getProjectsPending &&
            !getProjectsError &&
            getProjectsData?.length === 0 && <p>Nenhum projeto encontrado.</p>}

          {!getProjectsPending &&
            !getProjectsError &&
            getProjectsData?.map((project: IGetProjectsResponse) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                subtitle={project.company_name}
                imageUrl={"/images/exampleProjectImage.jpg"}
                favorited={favoriteProjects.includes(project._id) ?? false}
                rated={false}
              />
            ))}
        </div>
      </div>

      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getProjectsPending || getExhibitionCurrentPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
