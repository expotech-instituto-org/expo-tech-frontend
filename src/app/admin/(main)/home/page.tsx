"use client";
import { AdminTitles } from "@/components/AdminTitles";
import CabinIcon from "@mui/icons-material/Cabin";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Button, Card } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <AdminTitles title="Bem-vindo administrador!" goback={false}>
      <div className="flex gap-8 flex-col md:flex-row">
        <Card className="!w-fit h-[15vh]">
          <Button
            onClick={() => router.push(pathname + `/users`)}
            variant="outlined"
            className="!w-full flex flex-col !items-start h-full"
          >
            <div className="flex items-center w-full gap-3">
              <GroupsOutlinedIcon className="!text-[var(--azul-primario)]" />
              <h3 className="text-[var(--azul-primario)] font-[600] !text-[1rem] md:!text-[1.4rem] !normal-case">
                Gerenciar usuários
              </h3>
            </div>
            <p className="normal-case text-[var(--text)] ">
              Liste, crie, edite e delete usuários
            </p>
          </Button>
        </Card>
        <Card className="!w-fit h-[15vh]">
          <Button
            onClick={() => router.push(pathname + `/feiras`)}
            variant="outlined"
            className="!w-full flex flex-col !items-start h-full"
          >
            <div className="flex items-center w-full gap-3">
              <CabinIcon className="!text-[var(--azul-primario)] " />
              <h3 className="text-[var(--azul-primario)] font-[600] !text-[1rem] md:!text-[1.4rem]  !normal-case">
                Gerenciar feiras
              </h3>
            </div>
            <p className="normal-case text-[var(--text)] ">
              Liste, crie, edite, delete e veja projetos de feiras
            </p>
          </Button>
        </Card>
      </div>
    </AdminTitles>
  );
}
