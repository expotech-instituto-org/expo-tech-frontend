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
  type,
  onFavoriteToggle,
}: IProjectProps) {
  const router = useRouter();

  return (
    <div className="w-full h-[107px] bg-[url(/images/BackgroundCardProject.png)] bg-cover bg-center rounded-[var(--rounded-sm)] flex justify-left">
      <img
        src={imageUrl}
        alt="Project Image"
        height={90}
        width={90}
        className="rounded-[var(--rounded-sm)] h-[90px] w-[30%] ml-[8px] mt-[8px]"
      />
      <div className="flex flex-row justify-between px-2 w-[70%] pr-5">
        <div
          className="flex flex-col w-full gap-2 mt-2"
          onClick={() => type !== "1" ? router.push(`/visitante/projeto/${project_id}`) : null}
        >
          <h1 className="text-[var(--azul-primario)] font-bold  text-[15px]">
            {title}
          </h1>
          <p className="text-[var(--text)] text-[12px]  overflow-hidden whitespace-nowrap text-ellipsis ">
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
