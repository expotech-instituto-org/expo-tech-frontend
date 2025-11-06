"use client";
import Carousel from "@/components/Carousel";
import ProjectCard from "@/components/projectCard";
import Image from "next/image";
import { DataContext } from "@/dataContext";
import { useGetExhibitionById } from "@/service/hooks/useGetExhibitionById";
import { useGetUserById } from "@/service/hooks/useGetUserById";
import { usePatchFavoriteProject } from "@/service/hooks/usePatchFavoriteProject";
import AddIcon from "@mui/icons-material/Add";
import {
  Favorite,
  FormatListBulleted,
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
} from "@mui/icons-material";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { Backdrop, Button, CircularProgress, Fab } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [selected, setSelected] = useState("todos");
  const [avaliados, setAvaliados] = useState(true);
  const [search, setSearch] = useState("");
  const [showCarousel, setShowCarousel] = useState(true);
  const router = useRouter();
  const { userId, setExhibitionId } = useContext(DataContext);
  const params = useParams<{ id: string }>();
  const stickyRef = useRef<HTMLDivElement>(null);

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
          toast.success(
            data.data
              ? "Projeto favoritado com sucesso!"
              : "Projeto desfavoritado com sucesso!"
          );
          refreshUser();
        },
        onError: () => toast.error("Erro ao atualizar favorito"),
      }
    );
  }

  useEffect(() => {
    if (getUserByIdData) getExhibitionById();
  }, [getUserByIdData]);

  useEffect(() => {
    setExhibitionId(params.id!);
  }, [params.id]);

  useEffect(() => {
    if (getExhibitionByIdError) toast.error("Erro ao listar projetos");
    if (getUserByIdError) toast.error("Erro ao pegar dados do usuário");
  }, [getExhibitionByIdError, getUserByIdError]);

  useEffect(() => {
    const sentinela = document.getElementById("sentinela");
    if (!sentinela) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCarousel(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinela);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = getExhibitionByIdData?.projects?.filter(
    (project) => {
      if (selected === "todos") return true;
      if (selected === "favoritos")
        return favoriteProjects.includes(project._id);
      if (selected === "avaliados" && avaliados)
        return reviews.some((r) => r.project_id === project._id);
      if (selected === "avaliados" && !avaliados)
        return !reviews.some((r) => r.project_id === project._id);
      return true;
    }
  );

  return (
    <div>
      <div id="sentinela" className="h-[1px]" />

      {/* Banner + filtros */}
      <div
        ref={stickyRef}
        className={`sticky top-[7.5rem] left-0 bg-[var(--background)] py-2 rounded-b-xl z-20 transition-all duration-500`}
      >
        <div
          className={`transition-all duration-500 overflow-hidden ${
            showCarousel ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <Carousel
            images={
              getExhibitionByIdData?.banner?.length
                ? getExhibitionByIdData.banner
                : ["/images/exampleImgCarousel.png"]
            }
          />
        </div>

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
            onClick={() =>
              router.push(`/visitante/feiras/home/${params.id}/qrcode`)
            }
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
        <div className="flex justify-around items-center w-full mt-[1rem] text-[0.875rem] font-medium ">
          <button
            onClick={() => setSelected("todos")}
            className="flex items-center pb-[0.25rem] hover:opacity-80 transition"
          >
            <FormatListBulleted className="mr-[0.25rem] text-[var(--azul-primario)]" />
            <span
              className={`${
                selected === "todos"
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)] cursor-pointer"
                  : "text-[var(--azul-primario)]/50 cursor-pointer"
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
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)] cursor-pointer"
                  : "text-[var(--azul-primario)]/50 cursor-pointer"
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
                  ? "text-[var(--azul-primario)] border-b-2 border-[var(--azul-primario)] cursor-pointer"
                  : "text-[var(--azul-primario)]/50 cursor-pointer"
              }`}
            >
              Favoritos
            </span>
          </button>
        </div>
      </div>

      {/* Lista de projetos */}
      <div className="pt-[8rem] w-full grid grid-cols-1 gap-4">
        {filteredProjects?.length === 0 && (
          <p className="text-black">Nenhum projeto encontrado.</p>
        )}
        {(search.length > 0
          ? filteredProjects?.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
          : filteredProjects
        )?.map((project) => (
          <ProjectCard
            key={project._id}
            title={
              project.name.toUpperCase() == project.company_name.toUpperCase()
                ? project.name
                : project.name + " - " + project.company_name
            }
            subtitle={project.description}
            project_id={project._id}
            imageUrl={project.logo || "/images/exampleProjectImage.jpg"}
            favorited={favoriteProjects.includes(project._id) ?? false}
            onFavoriteToggle={() => favoriteProject(project._id)}
            rated={reviews.some((r) => r.project_id === project._id) ?? false}
          />
        ))}
      </div>
      <div
        className="fixed bottom-10 px-5 right-5 z-100 bg-[var(--vermelho)] rounded-full p-3 shadow-lg cursor-pointer w-fit h-fit"
        onClick={() => router.push("/visitante/contribuicao")}
      >
        <div className="flex flex-row gap-2 items-center ">
          <Image src="/images/beca.png" width={30} height={30} alt="Beca" />
          <h2 className="text-[1.2rem]">Doe agora!</h2>
        </div>
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
