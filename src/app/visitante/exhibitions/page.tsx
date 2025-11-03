"use client";
import ProjectCard from "@/components/projectCard";
import { useGetExhibitions } from "@/service/hooks/useGetExhibitions";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [searchByName, setSearchByName] = useState<string>("");

  const { getExhibitionsData, getExhibitionsError, getExhibitionsRest } =
    useGetExhibitions({});

  useEffect(() => {
    getExhibitionsError && toast.error("erro ao listar projetos");
  }, [getExhibitionsError]);
  return (
    <>
      <TextField
        value={searchByName}
        onChange={(e) => setSearchByName(e.target.value)}
        label="Pesquisar por feira"
        variant="outlined"
        size="small"
        className="[&_fieldset]:!border-[var(--azul-primario)] [&>*]:!text-[var(--azul-primario)] w-full"
      />
      {getExhibitionsData?.map((exhibition) => (
        <ProjectCard
          key={exhibition.id}
          title={exhibition.name}
          imageUrl={exhibition.image}
        />
      ))}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={getExhibitionsRest.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
