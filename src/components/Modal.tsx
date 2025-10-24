import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IProps {
  openModal: boolean;
  closeModal: () => void;
  title: string;
  children?: React.ReactNode;
  subtitle?: string;
  actions: React.ReactNode;
}

export function Modal({
  children,
  openModal,
  closeModal,
  title,
  subtitle,
  actions,
}: IProps) {
  return (
    <Dialog open={openModal} onClose={closeModal}>
      <DialogTitle className="!text-[var(--azul-primario)] !font-bold !text-[1.5rem]">
        {title}
      </DialogTitle>
      {subtitle && (
        <DialogContent>
          <DialogContentText className="!text-[var(--azul70)] !text-center ">
            {subtitle}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
