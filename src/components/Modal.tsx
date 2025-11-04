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
      <DialogTitle className="!text-[var(--azul-primario)] flex flex-col !font-bold !text-[1.5rem]">
        {title}
        {subtitle && (
          <span className="font-normal !text-[1rem]">{subtitle}</span>
        )}
      </DialogTitle>
      <DialogContent className="!pt-4">{children}</DialogContent>
      <DialogActions className="!justify-around">{actions}</DialogActions>
    </Dialog>
  );
}
