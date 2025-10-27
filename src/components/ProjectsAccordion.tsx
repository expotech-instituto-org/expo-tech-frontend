import { useDeleteExhibition } from "@/service/hooks/useDeleteExhibition";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { Modal } from "./Modal";
import { toast } from "sonner";
import { set } from "zod/v4";

interface IProject {
  id: string;
  name: string;
}

interface IProps {
  id: string;
  title: string;
  photo: string;
  searchProjectByName: (name: string) => void;
  project: IProject[];
}

export function ProjectsAccordion(props: IProps) {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [exhibitionNameForChanging, setExhibitionNameForChanging] =
    useState("");
  const router = useRouter();
  const path = usePathname();

  const {
    deleteExhibition,
    deleteExhibitionData,
    deleteExhibitionError,
    deleteExhibitionRest,
  } = useDeleteExhibition();

  useEffect(() => {
    props.searchProjectByName(searchInput);
  }, [searchInput]);

  useEffect(() => {
    if (deleteExhibitionData) {
      toast.error("exposição excluida com sucesso");
      setTimeout(() => {
        setOpenModal(false);
        window.location.reload();
      }, 3500);
    }
    deleteExhibitionError && toast.error("erro ao excluir exposição");
  }, [deleteExhibitionError, deleteExhibitionData]);

  return (
    <Accordion className="!bg-[var(--azul20)]">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        onClick={(e) => {
          e.stopPropagation();
        }}
        slotProps={{
          root: { component: "div" },
        }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <Avatar sizes="small" src={props.photo} />
            <Typography
              component="h4"
              className="!font-bold !text-[var(--azul-primario)] "
            >
              {props.title}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              className="!bg-[var(--azul-primario)] !text-[var(--azul20)]"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className="!bg-[#FF626238] !text-[var(--error)]"
              aria-label="delete"
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-4">
        {props.project.length !== 0 ? (
          <h1 className="text-[var(--azul-primario)] font-bold md:text-[1rem] text-[.8rem]">
            Nenhum projeto encontrado
          </h1>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col gap-4 sm:gap-0 w-full items-start justify-center sm:items-center sm:justify-between">
              <TextField
                slotProps={{
                  input: {
                    startAdornment: <SearchIcon />,
                  },
                }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Pesquisar projeto"
                variant="outlined"
                size="small"
                className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)] w-full sm:w-2/4 md:w-3/4"
              />
              <Button
                variant="contained"
                className="!w-fit !bg-[var(--azul-primario)]"
                onClick={() =>
                  router.push(path + "/upsert-project/criar_" + props.id)
                }
              >
                Criar projeto
              </Button>
            </div>
            {props.project.map((project) => (
              <ListCard isUser={false} key={project.id} {...project} />
            ))}
          </>
        )}
      </AccordionDetails>

      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        title={`Excluir feira`}
        subtitle={
          "Digite o nome da feira para confirmar a exclusão. Os projetos referentes serão excluídos também!"
        }
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              autoFocus
              onClick={() => {
                deleteExhibition({ exhibition_id: props.id });
              }}
              disabled={exhibitionNameForChanging.trim().length === 0}
              type="submit"
              className="!bg-[var(--azul-primario)] !text-white"
            >
              Excluir
            </Button>
          </>
        }
      >
        <TextField
          value={exhibitionNameForChanging}
          onChange={(e) => setExhibitionNameForChanging(e.target.value)}
          label="Nome"
          variant="outlined"
          size="small"
          className="[&_fieldset]:!border-[var(--azul-primario)] !h-fit rounded-[.5rem] !bg-[var(--background)] [&>*]:!text-[var(--azul-primario)] w-full"
        />
      </Modal>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={deleteExhibitionRest}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Accordion>
  );
}
