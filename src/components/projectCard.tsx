import Image from "next/image";
import { Favorite, FavoriteBorder, Grade } from "@mui/icons-material";

interface IProjectProps {
  favorited?: boolean;
  rated?: boolean;
  imageUrl: string;
  title: string;
  subtitle: string;
}
export default function ProjectCard({
  favorited,
  rated,
  imageUrl,
  title,
  subtitle,
}: IProjectProps) {
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
        className={`flex flex-col w-full pr-4 ${
          favorited === undefined && "justify-center"
        } `}
      >
        {rated && <Grade className="text-[var(--amarelo)] mt-[8px] " />}
        {favorited ? (
          <Favorite className={`text-[var(--error)] mt-[8px] self-end`} />
        ) : (
          favorited === false && (
            <FavoriteBorder
              className={`text-[var(--error)] mt-[8px] self-end `}
            />
          )
        )}
        <h1 className="text-[var(--azul-primario)] font-bold  ml-[14px] text-[22px]display:inline">
          {title}
        </h1>
        <p className="mt-[10px] ml-[14px] text-[var(--text)] text-[12px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
