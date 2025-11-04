"use client";
import { IToken } from "@/types/backendTypes";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { cloneElement, useEffect, useState } from "react";

export default function LayoutHome({
  children,
}: {
  children: React.ReactElement;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("visitante-token");
    if (!token) return router.push("/visitante/login");

    const decodedToken: IToken = jwtDecode(token);
    const isExpired = new Date() > new Date(decodedToken.exp * 1000);
    if (isExpired) {
      Cookies.remove("visitante-token");
      return router.push("/visitante/login");
    }
  }, [router]);

  return <>{children}</>;
}
