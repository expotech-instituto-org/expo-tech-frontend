"use client";
import ProjectCard from "@/components/projectCard";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { DateTime } from "luxon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [searchByName, setSearchByName] = useState<string>("");
  const path = usePathname();
  const router = useRouter();

  const {
    getExhibitionsData,
    getExhibitions,
    getExhibitionsError,
    getExhibitionsRest,
  } = useGetExhibitions({
    name: searchByName,
  });

  function handleClickExhibition(id: string, start: string, end: string) {
    const now = DateTime.now();
    const startDate = DateTime.fromISO(start);
    const endDate = DateTime.fromISO(end);

    if (now < startDate) {
      toast.error("A feira ainda não iniciou");
      return;
    }

    if (now > endDate) {
      toast.error("A feira já terminou");
      return;
    }

    router.push(path + "/home/" + id);
  }

  useEffect(() => {
    getExhibitionsError && toast.error("erro ao listar projetos");
  }, [getExhibitionsError]);

  useEffect(() => {
    getExhibitions();
  }, [searchByName]);

  function verificarFimFeira(start_date: string, end_date: string): string {
    let end = DateTime.fromISO(end_date);
    let hoje = DateTime.now();

    if (hoje > end) {
      return "Esta feira já acabou";
    } else {
      return (
        DateTime.fromISO(start_date).toFormat("dd/MM/yyyy") +
        " - " +
        DateTime.fromISO(end_date).toFormat("dd/MM/yyyy")
      );
    }
  }

  function verificarFimFeiraBool(start_date: string, end_date: string): boolean {
    let end = DateTime.fromISO(end_date);
    let hoje = DateTime.now();

    if (hoje > end) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-[33%]">
      <h1 className="text-[var(--azul-primario)] font-bold text-[1.7rem]">
        Escolha a feira que está visitando!
      </h1>
      <TextField
        value={searchByName}
        onChange={(e) => setSearchByName(e.target.value)}
        label="Pesquisar por feira"
        variant="outlined"
        size="small"
        className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-full"
      />

      {getExhibitionsData?.map((exhibition) => (
        <Button
          key={exhibition.id}
          className="!w-full !p-0 !block"
          onClick={() =>
            handleClickExhibition(
              exhibition.id,
              exhibition.start_date,
              exhibition.end_date
            )
          }
        >
          <ProjectCard
            project_id={exhibition.id}
            title={exhibition.name}
            imageUrl={exhibition.image}
            subtitle={verificarFimFeira(
              exhibition.start_date,
              exhibition.end_date
            )}
            type="1"
            subtitleRed={verificarFimFeiraBool(exhibition.start_date,exhibition.end_date)}
          />
        </Button>
      ))}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getExhibitionsRest.isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
