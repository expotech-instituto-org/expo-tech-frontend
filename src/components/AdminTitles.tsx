"use client";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  goback: boolean;
}
export function AdminTitles(props: IProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className={`${props.goback && "flex items-center gap-4"}`}>
          {props.goback && (
            <IconButton onClick={() => router.back()}>
              <ArrowBackIosNewOutlinedIcon className="!text-[var(--azul-primario)]" />
            </IconButton>
          )}
          <h1 className="text-[var(--azul-primario)] font-bold md:text-[2rem] text-[1.5rem]">
            {props.title}
          </h1>
        </div>
        <h2 className="text-[var(--azul-primario)] md:text-[1rem] text-[.9rem]">
          {props.subtitle}
        </h2>
      </div>
      {props.children}
    </div>
  );
}
