"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense } from "react";
import { useGetExhibitionById } from "@/service/hooks/useGetExhibitionById";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useEffect } from "react";
import { DataContext } from "@/dataContext";

function InfoPageInner() {
  const router = useRouter();
  const { exhibitionId } = useContext(DataContext);
  const searchParams = useSearchParams();
  const paramExhibitionId = searchParams?.get("exhibition");

  // use a fallback exhibition id for testing if NO exhibition id provided at all
  const FALLBACK_EXHIBITION_ID = "b2e2f820-f59b-42f5-a9f4-51fab8585577";

  // prefer: context > url param > fallback
  const resolvedExhibitionId =
    exhibitionId || paramExhibitionId || FALLBACK_EXHIBITION_ID;
  const { getExhibitionByIdData, getExhibitionByIdRest } = useGetExhibitionById(
    {
      exhibition_id: resolvedExhibitionId,
      enabled: true,
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reloadKey = `infoPageReloaded_${resolvedExhibitionId}`;

      // Se nunca recarregou, marca e recarrega
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, "true");
        window.location.reload(); // força reload completo da página
      }
    }
  }, [resolvedExhibitionId]);

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

  // monta a coluna esquerda com slots explícitos (coord 1..7)
  const leftSlice: Array<{ slot: any; coord: number | null }> = grid
    .slice(0, 7)
    .map((slot, idx) => ({ slot, coord: 1 + idx }));
  const leftColumn = leftSlice;
  // pega as posições A8..A13 em ordem crescente e anexa o número da coordenada a cada slot
  const rightSlice: Array<{ slot: any; coord: number | null }> = grid
    .slice(7, 13)
    .map((slot, idx) => ({ slot, coord: 8 + idx }));
  // inserir um marcador de 'gap' entre A10 e A11 (após o índice 2: A8(0),A9(1),A10(2),A11(3))
  rightSlice.splice(3, 0, { slot: "GAP", coord: null });
  // manter a ordem natural (o container usa `flex-col-reverse` para exibir de baixo para cima)
  const rightColumn = rightSlice;
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
          <div className="absolute inset-0 flex justify-between items-center px-[18%]">
            {/* Coluna esquerda */}
            <div className="flex flex-col-reverse justify-center gap-[clamp(12px,3.6vw,38px)] items-center">
              {leftColumn.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div
                    className={`relative w-[clamp(50px,6.8vw,76px)] max-w-[76px] aspect-square rounded-md bg-[#7A8CE0] flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
                      item.slot ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() =>
                      item.slot &&
                      typeof item.slot !== "string" &&
                      item.slot._id &&
                      router.push(`/visitante/projeto/${item.slot._id}`)
                    }
                  >
                    {item.slot && typeof item.slot !== "string" && (
                      <div
                        className="w-[72%] h-[72%] bg-gray-300 rounded-sm bg-cover bg-center border border-white"
                        style={{
                          backgroundImage: `url(${item.slot.logo})`,
                        }}
                      ></div>
                    )}

                    <span className="absolute bottom-0 left-1/2 translate-y-2 -translate-x-1/2 text-[0.6rem] font-bold text-white drop-shadow-md">
                      {item.coord !== null ? formatCoordinate(item.coord) : ""}
                    </span>
                  </div>

                  {/* nome do projeto abaixo do quadrado, centralizado */}
                  {item.slot && typeof item.slot !== "string" && (
                    <div className="mt-2 w-[clamp(50px,6.8vw,76px)] max-w-[76px] text-center text-[0.6rem] font-semibold text-[var(--azul-primario)] truncate">
                      {item.slot.name}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col-reverse justify-center gap-[clamp(12px,3.6vw,38px)] items-center">
              {rightColumn.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* nome do projeto à direita quando existir */}
                  {/* bloco especial de gap entre A10 e A11 */}
                  {item.slot === "GAP" ? (
                    <div className="w-[clamp(50px,6.8vw,76px)] max-w-[76px] aspect-square opacity-0 pointer-events-none shadow-none bg-transparent"></div>
                  ) : (
                    <div
                      className={`relative w-[clamp(50px,6.8vw,76px)] max-w-[76px] aspect-square rounded-md bg-[#7A8CE0] flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
                        item.slot ? "cursor-pointer" : "cursor-default"
                      }`}
                      onClick={() =>
                        item.slot &&
                        typeof item.slot !== "string" &&
                        item.slot._id &&
                        router.push(`/visitante/projeto/${item.slot._id}`)
                      }
                    >
                      {item.slot && typeof item.slot !== "string" && (
                        <div
                          className="w-[72%] h-[72%] bg-gray-300 rounded-sm bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${item.slot.logo})`,
                          }}
                        ></div>
                      )}

                      {/* mostrar a coordenada usando o coord do slot (ou fallback ao project.coordinates) */}
                      {item.coord !== null && (
                        <span className="absolute bottom-0 left-1/2 translate-y-2 -translate-x-1/2 text-[0.6rem] font-bold text-white drop-shadow-md">
                          {formatCoordinate(item.coord)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* nome do projeto abaixo do quadrado, centralizado */}
                  {item.slot && typeof item.slot !== "string" && (
                    <div className="mt-2 w-[clamp(50px,6.8vw,76px)] max-w-[76px] text-center text-[0.6rem] font-semibold text-[var(--azul-primario)] truncate">
                      {item.slot.name}
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

export default function InfoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InfoPageInner />
    </Suspense>
  );
}
