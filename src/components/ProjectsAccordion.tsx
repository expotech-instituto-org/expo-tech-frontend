import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";

interface IProject {
  id: string;
  name: string;
}

interface IProps {
  title: string;
  photo: string;
  searchProjectByName: (name: string) => void;
  project: IProject[];
}

export function ProjectsAccordion(props: IProps) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    props.searchProjectByName(searchInput);
  }, [searchInput]);
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
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
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
        {props.project.length === 0 ? (
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
                onClick={() => router.push(path + "/upsert-projeto")}
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
    </Accordion>
  );
}
