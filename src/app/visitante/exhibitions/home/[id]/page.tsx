"use client";
import ProjectCard from "@/components/projectCard"; // ajuste o caminho
import { useGetProjects } from "@/service/hooks/useGetProjects"; // ajuste o caminho
import { IGetProjectsResponse } from "@/types/backendTypes";
import {
  Favorite,
  FormatListBulleted,
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
} from "@mui/icons-material";
import { Backdrop, Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
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
    getProjectsError && toast.error("erro ao listar projetos");
  }, [getProjectsError]);
  return (
    <>
      <div className="bg-black h-[11.06rem] mt-[0.94rem]  rounded-[0.625rem]"></div>

      <div className="mt-[0.88rem] flex w-full justify-between">
        <Button
          className="!bg-[var(--azul-primario)] w-[45%]"
          variant="contained"
        >
          <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
        </Button>
        <Button
          className="!bg-[var(--azul-primario)] w-[45%] "
          variant="contained"
        >
          <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
        </Button>
      </div>

      <div className="flex items-center justify-between h-[2.5rem] bg-white border border-gray-300 rounded-[0.625rem] mt-[0.63rem] px-[0.63rem] shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar grupo"
          className="w-full outline-none text-[0.875rem]"
        />
        <Search className="text-gray-500" />
      </div>

      <div className="flex justify-around items-center mt-[1rem] text-[0.875rem] font-medium">
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
      <div className="mt-4  grid grid-cols-1 gap-4">
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
              imageUrl={project.logo}
              favorited={true}
              rated={false}
            />
          ))}
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getProjectsPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
