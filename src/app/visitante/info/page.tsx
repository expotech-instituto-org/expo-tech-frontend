"use client";

import { useGetExhibitionById } from "@/service/hooks/useGetExhibitionById";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import { DataContext } from "@/dataContext";

export default function InfoPage() {
  const router = useRouter();
  const { exhibitionId } = useContext(DataContext);

  const { getExhibitionByIdData, getExhibitionByIdRest } = useGetExhibitionById({
    exhibition_id: exhibitionId,
    enabled: true,
  });

  const TOTAL_POSITIONS = 13;
  const grid = Array(TOTAL_POSITIONS).fill(null);

  if (getExhibitionByIdData?.projects) {
    getExhibitionByIdData.projects.forEach((project) => {
      const index = project.coordinates - 1;
      if (index >= 0 && index < TOTAL_POSITIONS) {
        grid[index] = project;
      }
    });
  }

  const leftColumn = grid.slice(0, 7).reverse();
  // pega as posições A8..A13 em ordem crescente e anexa o número da coordenada a cada slot
  const rightSlice: Array<{ slot: any; coord: number | null }> = grid
    .slice(7, 13)
    .map((slot, idx) => ({ slot, coord: 8 + idx }));
  // inserir um marcador de 'gap' entre A10 e A11 (após o índice 2: A8(0),A9(1),A10(2),A11(3))
  rightSlice.splice(3, 0, { slot: "GAP", coord: null });
  // inverter para manter o layout com `flex-col-reverse` (comportamento anterior)
  const rightColumn = rightSlice.reverse();
  const formatCoordinate = (n: number) => `A${n}`;

  return (
  <div className="pb-5 overflow-x-hidden">
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

      {/* Corpo do mapa */}
      <div className="relative w-full flex justify-center items-start px-[5vw]">
        <div
          className="relative w-full max-w-full sm:max-w-[450px] aspect-[365/770] bg-[url('/images/Mapa.svg')] bg-no-repeat bg-contain bg-top"
          style={{
            marginTop: "-15px", // move o mapa mais pra cima
          }}
        >
          {/* Cards alinhados ao SVG */}
          <div className="absolute inset-0 flex justify-between items-center px-[20%]">
            {/* Coluna esquerda */}
            <div className="flex flex-col-reverse justify-center gap-[4vw] items-center">
              {leftColumn.map((project, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {project && (
                    <span className="absolute -left-[70px] text-[0.6rem] font-semibold text-[var(--azul-primario)] w-[60px] text-right truncate">
                      {project.name}
                    </span>
                  )}

                  <div
                    className={`w-[25vw] max-w-[60px] aspect-square rounded-md bg-[#7A8CE0] flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
                      project ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() =>
                      project?._id &&
                      router.push(`/visitante/projeto/${project._id}`)
                    }
                  >
                    {project && (
                      <div
                        className="w-[65%] h-[65%] bg-gray-300 rounded-sm bg-cover bg-center border border-white"
                        style={{
                          backgroundImage: `url(${project.logo})`,
                        }}
                      ></div>
                    )}

                    <span className="absolute bottom-[3px] right-[5px] text-[0.6rem] font-bold text-white drop-shadow-md">
                      {formatCoordinate(project?.coordinates || i + 1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col-reverse justify-center gap-[4vw] items-center">
              {rightColumn.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* nome do projeto à direita quando existir */}
                  {item.slot && typeof item.slot !== "string" && (
                    <span className="absolute -right-[70px] text-[0.6rem] font-semibold text-[var(--azul-primario)] w-[60px] text-left truncate">
                      {item.slot.name}
                    </span>
                  )}

                  {/* bloco especial de gap entre A10 e A11 */}
                  {item.slot === "GAP" ? (
                    <div className="w-[25vw] max-w-[60px] aspect-square opacity-0 pointer-events-none shadow-none bg-transparent"></div>
                  ) : (
                    <div
                      className={`w-[25vw] max-w-[60px] aspect-square rounded-md bg-[#7A8CE0] flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
                        item.slot ? "cursor-pointer" : "cursor-default"
                      }`}
                      onClick={() =>
                        item.slot && typeof item.slot !== "string" && item.slot._id &&
                        router.push(`/visitante/projeto/${item.slot._id}`)
                      }
                    >
                      {item.slot && typeof item.slot !== "string" && (
                        <div
                          className="w-[65%] h-[65%] bg-gray-300 rounded-sm bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${item.slot.logo})`,
                          }}
                        ></div>
                      )}

                      {/* mostrar a coordenada usando o coord do slot (ou fallback ao project.coordinates) */}
                      {item.coord !== null && (
                        <span className="absolute bottom-[3px] right-[5px] text-[0.6rem] font-bold text-white drop-shadow-md">
                          {formatCoordinate(item.coord)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
    </div>
  );
}
