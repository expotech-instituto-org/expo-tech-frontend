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
    const decodedToken: IToken = jwtDecode(Cookies.get("admin-token")!);
    const isExpired = new Date() > new Date(decodedToken.exp * 1000);
    if (isExpired) {
      Cookies.remove("admin-token");
      return router.push("/admin/login");
    }
  }, []);
  return (
    <>
      <nav className="w-full h-20 bg-[url(/images/navbarBg.png)] bg-cover bg-left mb-14"></nav>
      <Container maxWidth="xl">{children}</Container>
    </>
  );
}
