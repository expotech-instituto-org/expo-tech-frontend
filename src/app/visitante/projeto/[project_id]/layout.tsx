"use client";
import { IToken } from "@/types/backendTypes";
import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DataContext } from "@/dataContext";
export default function LayoutAdmin({
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
  return <div className="h-[100vh]">{children}</div>;
}
