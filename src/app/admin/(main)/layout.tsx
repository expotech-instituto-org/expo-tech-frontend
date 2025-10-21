import { Container } from "@mui/material";

export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="w-full h-20 bg-[url(/images/navbarBg.png)] bg-cover bg-left mb-14"></nav>
      <Container maxWidth="xl">{children}</Container>
    </>
  );
}
