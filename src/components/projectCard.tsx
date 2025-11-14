"use client";
import { Favorite, FavoriteBorder, Grade } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface IProjectProps {
  project_id: string;
  favorited?: boolean;
  rated?: boolean;
  imageUrl: string;
  title: string;
  subtitle?: string;
  subtitleRed?: boolean;
  type?: string;
  onFavoriteToggle?: () => void;
}
export default function ProjectCard({
  project_id,
  favorited,
  rated,
  imageUrl,
  title,
  subtitle,
  subtitleRed,
  type,
  onFavoriteToggle,
}: IProjectProps) {
  const router = useRouter();

  return (
    <div
      className="
        w-full 
        bg-[url(/images/BackgroundCardProject.png)] 
        bg-cover bg-center 
        rounded-[var(--rounded-sm)] 
        flex items-center 
        p-2 sm:p-3 
        gap-3 
        min-h-[90px] sm:min-h-[110px] 
        relative
      "
    >
      <img
        src={imageUrl}
        alt="Project Image"
        className="
          rounded-[var(--rounded-sm)] 
          object-cover 
          aspect-square 
          w-[30%] sm:w-[25%] md:w-[20%] lg:w-[15%]
          max-w-[110px]
          flex-shrink-0
        "
      />

      <div className="flex flex-row justify-between flex-1 items-start gap-2">
        <div
          className="flex flex-col w-full gap-2 mt-2"
          onClick={() =>
            type !== "1"
              ? router.push(`/visitante/projeto/${project_id}`)
              : null
          }
        >
          <h1
            className="
              text-[var(--azul-primario)] 
              font-bold 
              text-sm sm:text-[15px] md:text-[16px]
              leading-tight
              break-words
              line-clamp-2
              max-h-[3.2em]
              overflow-hidden
            "
          >
            {title.length > 70 ? `${title.slice(0, 70)}...` : title}
          </h1>
          {subtitleRed == true ? (
            <p
              className="
                text-[var(--error)] 
                font-bold
                text-xs sm:text-[12px] md:text-[13px] 
                line-clamp-2 sm:line-clamp-3 
                overflow-hidden
              "
            >
              {subtitle}
            </p>
          ) : (
            <p
              className="
                text-[var(--text)] 
                text-xs sm:text-[12px] md:text-[13px] 
                line-clamp-2 sm:line-clamp-3 
                overflow-hidden
              "
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {type !== "1" && (
        <div className="absolute right-4 top-4 flex flex-row gap-2 items-center">
          {rated && (
            <Grade className="text-[var(--amarelo)] text-sm sm:text-base" />
          )}
          {favorited ? (
            <Favorite
              className="
                text-[var(--error)]
                cursor-pointer 
                text-sm sm:text-base 
                transition-transform duration-200 
                hover:scale-110
              "
              onClick={onFavoriteToggle}
            />
          ) : (
            <FavoriteBorder
              className="
                text-[var(--error)]
                cursor-pointer 
                text-sm sm:text-base 
                transition-transform duration-200 
                hover:scale-110
              "
              onClick={onFavoriteToggle}
            />
          )}
        </div>
      )}
    </div>
  );
}
