"use client";
import ProjectCard from "@/components/projectCard";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { DateTime } from "luxon";
import { usePathname, useRouter } from "next/navigation";
import { datetime } from "node_modules/zod/v4/core/regexes.cjs";
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
  return (
    <div className="flex flex-col gap-4 mt-[33%]">
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
            subtitle={
              DateTime.fromISO(exhibition.start_date).toFormat("dd/MM/yyyy") +
              " - " +
              DateTime.fromISO(exhibition.end_date).toFormat("dd/MM/yyyy")
            }
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
