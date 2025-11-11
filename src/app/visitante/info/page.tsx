"use client";

import { useGetExhibitionById } from "@/service/hooks/useGetExhibitionById";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import { DataContext } from "@/dataContext";

export default function InfoPage() {
  const router = useRouter();
  const { exhibitionId } = useContext(DataContext);

  const { getExhibitionByIdData, getExhibitionByIdRest } = useGetExhibitionById(
    {
      exhibition_id: exhibitionId,
      enabled: true,
    }
  );

  const TOTAL_POSITIONS = 24;
  const grid = Array(TOTAL_POSITIONS).fill(null);

  if (getExhibitionByIdData?.projects) {
    getExhibitionByIdData.projects.forEach((project) => {
      const index = project.coordinates - 1;
      if (index >= 0 && index < TOTAL_POSITIONS) {
        grid[index] = project;
      }
    });
  }

  const blocks = [0, 1, 2];
  const formatCoordinate = (n: number) => `A${n}`;

  return (
    <div className="pb-5">
      {/* Header fixa */}
      <div className="w-full flex gap-4 items-center px-[8px] !bg-[var(--background)] backdrop-blur-sm mb-8">
        <button
          onClick={() => router.back()}
          style={{ border: "none", cursor: "pointer" }}
        >
          <ArrowBackIcon className="text-[var(--azul-primario)] !text-[2rem]" />
        </button>

        <h1 className="flex-none font-bold text-[30px] text-[var(--azul-primario)] w-[370px]">
          Mapa da Feira
        </h1>
      </div>
      <div className="relative w-full h-screen bg-[url('/images/Mapa.svg')] bg-no-repeat bg-center bg-[length:365px_770px] px-[30px]">
        {/* Corpo do mapa */}
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <div className="flex flex-col gap-10 h-full align-center justify-center ">
            {blocks.map((blockIndex) => {
              const start = blockIndex * 8;
              const cells = grid.slice(start, start + 8).reverse();

              return (
                <div
                  key={blockIndex}
                  className="w-[260px] h-[140px] p-[6px] grid grid-cols-4 grid-rows-2 gap-2 relative"
                >
                  {cells.map((project, i) => {
                    const isBottomRow = i >= 4;
                    const coordinateNumber = 8 * blockIndex + (8 - i);

                    return (
                      <div
                        key={i}
                        className="relative flex flex-col items-center"
                      >
                        {/* Nome do projeto fora do card */}
                        {project && !isBottomRow && (
                          <span className="absolute -top-5 text-[9px] font-semibold text-[var(--azul-primario)] text-center w-full truncate">
                            {project.name}
                          </span>
                        )}

                        {/* Quadradinho azul clicável */}
                        <div
                          className={`w-[55px] h-[55px] rounded-md bg-[#7A8CE0] flex items-center justify-center relative shadow-md transition-transform hover:scale-105 ${
                            project ? "cursor-pointer" : "cursor-default"
                          }`}
                          onClick={() =>
                            project?._id &&
                            router.push(`/visitante/projeto/${project._id}`)
                          }
                        >
                          {/* Imagem central */}
                          {project && (
                            <div
                              className="w-[35px] h-[35px] bg-gray-300 rounded-sm bg-cover bg-center border border-white"
                              style={{
                                backgroundImage: `url(${project.logo})`,
                              }}
                            ></div>
                          )}

                          {/* Texto da coordenada */}
                          <span className="absolute bottom-[3px] right-[5px] text-[9px] font-bold text-white drop-shadow-md">
                            {formatCoordinate(
                              project?.coordinates || coordinateNumber
                            )}
                          </span>
                        </div>

                        {/* Nome do projeto na parte de baixo */}
                        {project && isBottomRow && (
                          <span className="absolute -bottom-5 text-[9px] font-semibold text-[var(--azul-primario)] text-center w-full truncate">
                            {project.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tela de carregamento */}
        {getExhibitionByIdRest.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <p className="text-lg font-semibold text-[var(--azul-primario)]">
              Carregando mapa...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
