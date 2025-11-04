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
  children: React.ReactElement<{ userId: string | null }>;
}) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("visitante-token");
    if (!token) return router.push("/visitante/login");

    const decodedToken: IToken = jwtDecode(token);
    const isExpired = new Date() > new Date(decodedToken.exp * 1000);
    if (isExpired) {
      Cookies.remove("visitante-token");
      return router.push("/visitante/login");
    }

    setUserId(decodedToken.user_id);
  }, [router]);

  return <Container maxWidth="sm">{cloneElement(children, { userId })}</Container>;
}
