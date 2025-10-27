import { useDeleteProject } from "@/service/hooks/useDeleteProject";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DeleteUserDrawer } from "./DeleteUserDrawer";
import { Modal } from "./Modal";
import { UpsertUserDrawer } from "./UpsertUserDrawer";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const path = usePathname();
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [isOpenDeleteProjectModal, setIsOpenDeleteProjectModal] = useState({
    open: false,
    id: "",
  });

  const {
    deleteProject,
    deleteProjectData,
    deleteProjectError,
    deleteProjectRest,
  } = useDeleteProject();

  useEffect(() => {
    deleteProjectError &&
      toast.error("Erro ao deletar projeto, " + deleteProjectError);
    if (deleteProjectData) {
      toast.success("Projeto deletado com sucesso");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [deleteProjectError, deleteProjectData]);

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
            onClick={() => {
              if (props.isUser)
                return setSelectedId(props.id), setOpenEditDrawer(true);
              return router.push(path + "/upsert-project/editar_" + props.id);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => (
              setSelectedId(props.id),
              props.isUser && setOpenDeleteDrawer(true),
              props.isUser && setSelectedEmail(props.email),
              !props.isUser &&
                setIsOpenDeleteProjectModal({
                  open: true,
                  id: props.id,
                })
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

      {isOpenDeleteProjectModal && (
        <Modal
          openModal={isOpenDeleteProjectModal.open!}
          closeModal={() =>
            setIsOpenDeleteProjectModal({ open: false, id: "" })
          }
          title="Excluir critério"
          subtitle="Tem certeza que deseja excluir este projeto?"
          actions={
            <div className="flex w-full gap-4 justify-end">
              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  setIsOpenDeleteProjectModal({
                    open: false,
                    id: "",
                  })
                }
                className="!text-[var(--azul-primario)] !border-[var(--azul-primario)]"
              >
                Cancelar
              </Button>
              <Button
                size="small"
                variant="contained"
                autoFocus
                type="submit"
                onClick={() => {
                  deleteProject({ project_id: isOpenDeleteProjectModal.id });
                  setIsOpenDeleteProjectModal({
                    open: false,
                    id: "",
                  });
                }}
                className="!bg-[var(--azul-primario)] !text-white"
              >
                Excluir
              </Button>
            </div>
          }
        />
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={deleteProjectRest}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
