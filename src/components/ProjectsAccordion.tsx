import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ListCard } from "./ListCard";

interface IProject {
  id: string;
  name: string;
}

interface IProps {
  title: string;
  photo: string;
  project: IProject[];
}

export function ProjectsAccordion(props: IProps) {
  return (
    <Accordion className="!bg-[var(--azul20)]">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Avatar sizes="small" src={props.photo} />
        <Typography
          component="h4"
          className="!font-bold !text-[var(--azul-primario)] self-center pl-4 "
        >
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-4">
        {props.project.map((project) => (
          <ListCard isUser={false} key={project.id} {...project} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
