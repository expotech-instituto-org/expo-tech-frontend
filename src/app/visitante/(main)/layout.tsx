import { Container } from "@mui/material";

export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container maxWidth="sm">{children}</Container>;
}
