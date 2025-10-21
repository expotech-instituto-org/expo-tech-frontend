import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import { EditUserDrawer } from "./EditUserDrawer";

export type TUserType =
  | "visitante"
  | "administrador"
  | "cliente"
  | "professor"
  | "expositor"
  | "aluno"
  | "colaborador"
  | "avaliador";

interface IProps {
  id: string;
  photo?: string;
  name: string;
  email: string;
  userType: TUserType;
}

const chipMap = {
  visitante: (
    <Chip size="small" label="Visitante" className=" !h-[18px] !bg-[#FFF3AF]" />
  ),
  administrador: (
    <Chip
      size="small"
      label="Administrador"
      className=" !h-[18px] !bg-[#FFAFAF]"
    />
  ),
  cliente: (
    <Chip size="small" label="Cliente" className=" !h-[18px] !bg-[#BDFFAF]" />
  ),
  professor: (
    <Chip size="small" label="Professor" className=" !h-[18px] !bg-[#F6BFFF]" />
  ),
  expositor: (
    <Chip size="small" label="Expositor" className=" !h-[18px] !bg-[#BFFFE5]" />
  ),
  aluno: (
    <Chip size="small" label="Aluno" className=" !h-[18px] !bg-[#BFDBFF]" />
  ),
  colaborador: (
    <Chip
      size="small"
      label="Colaborador"
      className=" !h-[18px] !bg-[#FFDFBF]"
    />
  ),
  avaliador: (
    <Chip
      size="small"
      label="Avaliador"
      className=" !h-[18px] !bg-[##FFA6C9]"
    />
  ),
};

export function UserCard(props: IProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <>
      <div className="flex items-center justify-between bg-[var(--azul20)] rounded-[var(--rounded-sm)] px-4 py-3">
        <div className="flex items-center gap-4 ">
          <Avatar src={props.photo || "/images/defaultProfileUser.png"} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold !text-[var(--azul-primario)] ">
                {props.name}
              </h4>
              {chipMap[props.userType]}
            </div>
            <h5 className="!text-[var(--azul-primario)]">{props.email}</h5>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            className="!bg-white"
            aria-label="edit"
            onClick={() => (setSelectedId(props.id), setOpenDrawer(true))}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => setSelectedId(props.id)}
            className="!bg-white"
            aria-label="delete"
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </div>
      </div>

      <EditUserDrawer
        userId={selectedId}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
}
