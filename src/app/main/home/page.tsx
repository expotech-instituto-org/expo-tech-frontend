"use client";
import { useState } from "react";
import {
  MapOutlined,
  QrCodeScanner,
  Search,
  Star,
  FormatListBulleted,
  Favorite,
} from "@mui/icons-material";
import { useGetProjects } from "@/service/hooks/useGetProjects"; // ajuste o caminho
import ProjectCard from "@/components/projectCard"; // ajuste o caminho
import { IProject } from "@/types/backendTypes";

export default function Home() {
  const [selected, setSelected] = useState("todos");
  const [search, setSearch] = useState("");

  const { projects, projectsLoading, projectsError } = useGetProjects({
    exhibition_id: "exhibition-uuid-1234",
  });

  console.log("Projetos:", projects);
  console.log("Carregando:", projectsLoading);
  console.log("Erro:", projectsError);
  return (
    <div>
      <div className="bg-[url(/images/Cabeçalho.png)] w-full h-[9.31rem] bg-fixed fixed top-0 left-0">
        <div className="absolute">
          <p className="text-[1.25rem] ml-[0.94rem] mt-[2.5rem]">Bem vindo a</p>
          <h1 className="text-[3rem] font-bold ml-[0.94rem] mt-[-0.31rem]">
            Expo360
          </h1>
        </div>
      </div>

      <div className="pt-[9.31rem]">
        <div className="bg-black w-[23rem] h-[11.06rem] mt-[0.94rem] ml-[1.38rem] mr-[1.38rem] rounded-[0.625rem]"></div>

        <div className="mt-[0.88rem] flex">
          <button className="flex items-center justify-center w-[11.38rem] h-[2.25rem] bg-[var(--azul-primario)] rounded-[0.625rem] ml-[1.19rem] text-white font-medium">
            <MapOutlined className="mr-[0.31rem]" /> Mapa da Feira
          </button>
          <button className="flex items-center justify-center w-[11.38rem] h-[2.25rem] bg-[var(--azul-primario)] rounded-[0.625rem] ml-[0.63rem] text-white font-medium">
            <QrCodeScanner className="mr-[0.31rem]" /> Ler QR Code
          </button>
        </div>

        <div className="flex items-center justify-between w-[23.38rem] h-[2.5rem] bg-white border border-gray-300 rounded-[0.625rem] mt-[0.63rem] ml-[1.19rem] px-[0.63rem] shadow-sm">
          <input
            type="text"
            placeholder="Buscar grupo"
            className="w-full outline-none text-[0.875rem]"
          />
          <Search className="text-gray-500" />
        </div>

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
        <div className="mt-4 ml-[1.19rem] grid grid-cols-1 gap-4">
          {projectsLoading && (
            <p className="text-[var(--azul-primario)]">
              Carregando projetos...
            </p>
          )}
          {projectsError && (
            <p className="text-[var(--error)]">{projectsError}</p>
          )}
          {!projectsLoading && !projectsError && projects?.length === 0 && (
            <p>Nenhum projeto encontrado.</p>
          )}

          {!projectsLoading &&
            !projectsError &&
            projects
              ?.filter((project: IProject) => {
                if (selected === "todos") return true;
                // if (selected === "avaliados") return project.rated; // ou campo equivalente
                // if (selected === "favoritos") return project.favorited; // ou campo equivalente
                return true;
              })
              .map((project: IProject) => (
                <ProjectCard
                  key={project._id}
                  title={project.name}
                  subtitle={project.company_name}
                  imageUrl={ "/images/exampleProjectImage.jpg"} // fallback
                  favorited={true}
                  rated={false}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
