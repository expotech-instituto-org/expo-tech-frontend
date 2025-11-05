"use client";
import ProjectCard from "@/components/projectCard";
import { useGetProjects } from "@/service/hooks/useGetProjects";
import { IGetProjectsResponse } from "@/types/backendTypes";
import {
  Favorite,
  FormatListBulleted,
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
} from "@mui/icons-material";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";

export default function Home() {
  const [selected, setSelected] = useState("todos");
  const [search, setSearch] = useState("");

  const { getProjectsData, getProjectsPending, getProjectsError } =
    useGetProjects({
      exhibition_id: "exhibition-uuid-1234",
      project_name: search,
    });

  useEffect(() => {
    if (getProjectsError) {
      toast.error("Erro ao listar projetos");
    }
  }, [getProjectsError]);

  const filteredProjects = useMemo(() => {
    const projects = getProjectsData || [];

    if (selected === "avaliados") {
      return projects.filter((project: IGetProjectsResponse) => project.is_rated);
    }
    if (selected === "favoritos") {
      return projects.filter((project: IGetProjectsResponse) => project.is_favorited);
    }
    return projects;
  }, [getProjectsData, selected]);

  return (
    <>
      <div className="bg-black h-[11.06rem] mt-[0.94rem] rounded-[0.625rem]" />

      <div className="mt-[0.88rem] flex w-full justify-between">
        <Button
          className="!bg-[var(--azul-primario)] w-[45%]"
          variant="contained"
        >
          <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
        </Button>
        <Button
          className="!bg-[var(--azul-primario)] w-[45%]"
          variant="contained"
        >
          <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
        </Button>
      </div>

      <div className="flex items-center justify-between h-[2.5rem] bg-white border border-gray-300 rounded-[0.625rem] mt-[0.63rem] px-[0.63rem] shadow-sm focus-within:ring-2 focus-within:ring-[var(--azul-primario)] transition-all duration-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar grupo"
          className="w-full outline-none text-[0.875rem] text-gray-700 placeholder:text-gray-500"
        />
        <Search className="text-gray-500" />
      </div>

      <div className="flex justify-around items-center mt-[1rem] text-[0.875rem] font-medium">
        <button
          onClick={() => setSelected("todos")}
          className={`flex items-center pb-[0.25rem] border-b-2 ${
            selected === "todos"
              ? "border-[var(--azul-primario)]"
              : "border-transparent"
          } hover:opacity-80 transition`}
        >
          <FormatListBulleted
            className={`mr-[0.25rem] ${
              selected === "todos"
                ? "text-[var(--azul-primario)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          />
          <span
            className={`${
              selected === "todos"
                ? "text-[var(--azul-primario)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          >
            Todos
          </span>
        </button>

        <button
          onClick={() => setSelected("avaliados")}
          className={`flex items-center pb-[0.25rem] border-b-2 ${
            selected === "avaliados"
              ? "border-[var(--azul-primario)]"
              : "border-transparent"
          } hover:opacity-80 transition`}
        >
          <Star
            className={`mr-[0.25rem] ${
              selected === "avaliados"
                ? "text-[var(--amarelo)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          />
          <span
            className={`${
              selected === "avaliados"
                ? "text-[var(--azul-primario)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          >
            Já Avaliados
          </span>
        </button>

        <button
          onClick={() => setSelected("favoritos")}
          className={`flex items-center pb-[0.25rem] border-b-2 ${
            selected === "favoritos"
              ? "border-[var(--azul-primario)]"
              : "border-transparent"
          } hover:opacity-80 transition`}
        >
          <Favorite
            className={`mr-[0.25rem] ${
              selected === "favoritos"
                ? "text-[var(--error)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          />
          <span
            className={`${
              selected === "favoritos"
                ? "text-[var(--azul-primario)]"
                : "text-[var(--azul-primario)]/50"
            }`}
          >
            Favoritos
          </span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {getProjectsPending && (
          <p className="text-center text-gray-500 mt-8">Carregando...</p>
        )}

        {!getProjectsPending &&
          !getProjectsError &&
          filteredProjects.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Nenhum projeto encontrado.
            </p>
          )}

        {!getProjectsPending &&
          !getProjectsError &&
          filteredProjects.map((project: IGetProjectsResponse) => (
            <ProjectCard
              key={project._id}
              title={project.name}
              subtitle={project.company_name}
              imageUrl={project.logo}
              favorited={project.is_favorited}
              rated={project.is_rated}
            />
          ))}
      </div>

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        })}
        open={getProjectsPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
