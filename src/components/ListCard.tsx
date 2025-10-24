import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import { UpsertUserDrawer } from "./UpsertUserDrawer";
import { DeleteUserDrawer } from "./DeleteUserDrawer";

export type TUserType =
  | "visitante"
  | "administrador"
  | "cliente"
  | "professor"
  | "expositor"
  | "aluno"
  | "colaborador"
  | "avaliador";

type TNotification =
  | { isUser: false; id: string; name: string }
  | {
      isUser: true;
      id: string;
      photo?: string;
      name: string;
      email: string;
      userType: TUserType;
    };

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

export function ListCard(props: TNotification) {
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  return (
    <>
      <div
        className={`flex items-center justify-between ${
          props.isUser ? " bg-[var(--azul20)]" : "!bg-white"
        } rounded-[var(--rounded-sm)] px-4 py-3`}
      >
        {props.isUser ? (
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
        ) : (
          <h4 className="font-bold !text-[var(--azul-primario)] ">
            {props.name}
          </h4>
        )}

        <div className="flex items-center gap-2">
          <IconButton
            className={
              props.isUser
                ? "!bg-[var(--azul-primario)] !text-[var(--azul20)]"
                : "!bg-[var(--azul20)]"
            }
            aria-label="edit"
            onClick={() => (setSelectedId(props.id), setOpenEditDrawer(true))}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => (
              setSelectedId(props.id),
              props.isUser && setOpenDeleteDrawer(true),
              props.isUser && setSelectedEmail(props.email)
            )}
            className="!bg-[#FF626238] !text-[var(--error)]"
            aria-label="delete"
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </div>
      </div>

      {props.isUser && (
        <>
          <UpsertUserDrawer
            userId={selectedId}
            open={openEditDrawer}
            onClose={() => setOpenEditDrawer(false)}
          />

          <DeleteUserDrawer
            open={openDeleteDrawer}
            onClose={() => setOpenDeleteDrawer(false)}
            email={selectedEmail}
            userId={selectedId}
          />
        </>
      )}
    </>
  );
}
