"use client";
import { DataContext } from "@/dataContext";
import { IToken } from "@/types/backendTypes";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserId } = useContext(DataContext);
  const router = useRouter();
  useEffect(() => {
    const decodedToken: IToken = jwtDecode(Cookies.get("visitante-token")!);
    const isExpired = new Date() > new Date(decodedToken.exp * 1000);
    if (isExpired) {
      Cookies.remove("visitante-token");
      return router.push("/visitante/login");
    }
    return setUserId(decodedToken.user_id);
  }, []);

  return (
    <div>
      <div className="bg-[url(/images/banner.jpg)] bg-cover bg-left mb-2 w-full h-30 fixed top-0 left-0 z-30">
      </div>
      <Container maxWidth="sm">{children}</Container>
    </div>
  );
}
