"use client";
import { IToken } from "@/types/backendTypes";
import { Container } from "@mui/material";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("visitante-token");
    if (!token) {
      // Se não há token, redireciona para login
      return router.push("/visitante/login");
    }
    try {
      const decodedToken: IToken = jwtDecode(token);
      const isExpired = new Date() > new Date(decodedToken.exp * 1000);
      if (isExpired) {
        Cookies.remove("visitante-token");
        return router.push("/visitante/login");
      }
    } catch (e) {
      // Token inválido, remove e redireciona
      Cookies.remove("visitante-token");
      return router.push("/visitante/login");
    }
  }, []);
  return (
    <>
      <Container maxWidth="xl" className="!p-0">{children}</Container>
    </>
  );
}
