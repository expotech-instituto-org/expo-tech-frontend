"use client";
import Carousel from "@/components/Carousel";
import ProjectCard from "@/components/projectCard";
import { DataContext } from "@/dataContext";
import { useGetExhibitionById } from "@/service/hooks/useGetExhibitionById";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePatchFavoriteProject } from "@/service/hooks/usePatchFavoriteProject";
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
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [selected, setSelected] = useState("todos");
  const [avaliados, setAvaliados] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const path = usePathname();
  const { userId } = useContext(DataContext);
  const params = useParams<{ id: string }>();

  const {
    getUserById: refreshUser,
    getUserByIdData,
    getUserByIdError,
    getUserByIdPending,
  } = useGetUserById({ user_id: userId || "", enabled: !!userId });

  const {
    getExhibitionByIdData,
    getExhibitionByIdError,
    getExhibitionByIdRest,
    getExhibitionById,
  } = useGetExhibitionById({
    exhibition_id: params.id!,
    enabled: true,
  });

  const favoriteProjects = getUserByIdData?.favorited_projects || [];
  const reviews = getUserByIdData?.reviews || [];

  const { patchFavoriteProject } = usePatchFavoriteProject();

  function favoriteProject(project_id: string) {
    patchFavoriteProject(
      { project_id },
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
    if (getUserByIdData) {
      getExhibitionById();
    }
  }, [getUserByIdData]);

  useEffect(() => {
    if (getExhibitionByIdError) toast.error("Erro ao listar projetos");
    if (getUserByIdError) toast.error("Erro ao pegar dados do usuaŕio");
  }, [getExhibitionByIdError, getUserByIdError]);

  const filteredProjects = getExhibitionByIdData?.projects?.filter(
    (project) => {
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
      {/* Banner */}
      <Carousel />

      {/* Botões principais */}
      <div className="mt-[0.88rem] flex justify-between px-[1.19rem]">
        <Button
          className="!bg-[var(--azul-primario)] w-[48%] !rounded-[0.625rem]"
          variant="contained"
          onClick={() => router.push("/visitante/info")}
        >
          <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
        </Button>
        <Button
          className="!bg-[var(--azul-primario)] w-[48%] !rounded-[0.625rem]"
          variant="contained"
          onClick={() => router.push("/visitante/qrcode")}
        >
          <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
        </Button>
      </div>

      {/* Barra de busca */}
      <div className="flex items-center justify-between w-full h-[2.5rem] bg-white border border-gray-300 rounded-[0.625rem] mt-[0.63rem] px-[0.63rem] shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar grupo"
          className="w-full outline-none text-[0.875rem] text-black"
        />
        <Search className="text-gray-500" />
      </div>

      {/* Filtros */}
      <div className="flex justify-around items-center w-full mt-[1rem] text-[0.875rem] font-medium ml-[1.19rem]">
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
      <div className=" mt-4 w-full grid grid-cols-1 gap-4">
        {filteredProjects?.length === 0 && (
          <p className="text-black">Nenhum projeto encontrado.</p>
        )}
        {search.length > 0
          ? filteredProjects
              ?.filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project) => (
                <ProjectCard
                  key={project._id}
                  project_id={project._id}
                  title={project.name}
                  subtitle={project.company_name}
                  imageUrl={project.logo || "/images/exampleProjectImage.jpg"}
                  favorited={favoriteProjects.includes(project._id) ?? false}
                  onFavoriteToggle={() => favoriteProject(project._id)}
                  rated={
                    reviews.some(
                      (review) => review.project_id === project._id
                    ) ?? false
                  }
                />
              ))
          : filteredProjects?.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                project_id={project._id}
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

      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getExhibitionByIdRest.isLoading || getUserByIdPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
