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
  onFavoriteToggle?: () => void;
}
export default function ProjectCard({
  project_id,
  favorited,
  rated,
  imageUrl,
  title,
  subtitle,
  onFavoriteToggle,
}: IProjectProps) {
  const router = useRouter();
  return (
    <div className=" h-[107px] bg-[url(/images/BackgroundCardProject.png)] bg-cover bg-center rounded-[10px] flex justify-left">
      <img
        src={imageUrl}
        alt="Project Image"
        height={90}
        width={90}
        className="rounded-[10px] h-[90px] w-[90px] ml-[8px] mt-[8px]"
      />
      <div
        className="flex flex-row justify-between w-full p-2"
        onClick={() => router.push(`/visitante/projeto/${project_id}`)}
      >
        <div className="flex flex-col">
          <h1 className="text-[var(--azul-primario)] font-bold  ml-[14px] text-[22px]display:inline">
            {title}
          </h1>
          <p className="mt-[10px] ml-[14px] text-[var(--text)] text-[12px]">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          {rated && <Grade className="text-[var(--amarelo)] mt-[8px] " />}
          {favorited === true ? (
            <Favorite
              className="text-[var(--error)] mt-[8px]"
              onClick={onFavoriteToggle}
            />
          ) : (
            favorited === false && (
              <FavoriteBorder
                className={`text-[var(--error)] mt-[8px] `}
                onClick={onFavoriteToggle}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
