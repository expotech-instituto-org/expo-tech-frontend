"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const param = useParams();

  return <p>{param.id === "login" ? "login" : "cadastro"}</p>;
}
