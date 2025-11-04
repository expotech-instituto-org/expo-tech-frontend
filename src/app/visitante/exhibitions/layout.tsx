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

  return (
    <div>
      <div className="bg-[url(/images/Cabeçalho.png)] bg-cover bg-left mb-2 w-full h-30">
        <p className="text-[1.25rem] ml-[0.94rem] pt-4">Bem vindo a</p>
        <h1 className="text-[3rem] font-bold ml-[0.94rem] mt-[-0.31rem]">
          Expo360
        </h1>
      </div>
      <Container maxWidth="sm">{children}</Container>
    </div>
  );
}
