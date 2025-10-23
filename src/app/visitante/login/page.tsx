"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      router.push(pathname + "/inicio");
    }, 5000);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src="/images/Logo.svg" alt="Logo image" className="h-1/4" />
    </div>
  );
}
