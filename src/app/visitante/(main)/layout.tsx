"use client";
import { IToken } from "@/types/backendTypes";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const decodedToken: IToken = jwtDecode(Cookies.get("visitante-token")!);
    const isExpired = new Date() > new Date(decodedToken.exp * 1000);
    if (isExpired) {
      Cookies.remove("visitante-token");
      return router.push("/visitante/login");
    }
  }, []);

  return <Container maxWidth="sm">{children}</Container>;
}
