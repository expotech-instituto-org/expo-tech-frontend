import { Avatar } from "@mui/material";

interface IMember {
  name: string;
  photo?: string;
  Class: string;
}

interface IMembersProps {
  Members: IMember[];
}

export function MembersComponent({ Members }: IMembersProps) {
  function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // 1) Agrupa por sala (Class)
  const membersByClass = Members.reduce<Record<string, IMember[]>>(
    (acc, member) => {
      if (!acc[member.Class]) acc[member.Class] = [];
      acc[member.Class].push(member);
      return acc;
    },
    {}
  );

  // 2) Para cada sala, divide em grupos de 10
  const salasChunked = Object.entries(membersByClass).map(
    ([classe, members]) => ({
      classe,
      grupos: chunkArray(members, 10),
    })
  );

  return (
    <>
      {salasChunked.map(({ classe, grupos }) =>
        grupos.map((grupo, idxGrupo) => (
          <div
            key={`${classe}-grupo-${idxGrupo}`}
            className="my-4 bg-[url(/images/bg-equipe.png)] bg-clip-border bg-origin-border bg-cover rounded-[.5rem] bg-left bg-no-repeat min-w-full min-h-fit pb-[.8rem]"
          >
            <section className="mb-4">
              {/* Exibe o nome da sala */}
              <p className="pl-[3rem] py-[.8rem] font-medium text-[var(--azul-primario)]">
                {classe}
              </p>

              <div className="grid grid-cols-2 gap-y-5 px-4 ">
                {grupo.map((member, idxMember) => (
                  <div
                    key={`${classe}-g${idxGrupo}-m${idxMember}-${member.name}`}
                    className="relative flex items-center"
                  >
                    <Avatar
                      src={member.photo}
                      alt={member.name}
                      className="absolute -right-8 -bottom-6 -translate-y-1/2"
                    />
                    <div className="bg-[var(--azul70)] text-white rounded-[10px] py-2 pl-9 pr-3 w-fit overflow-hidden whitespace-nowrap text-ellipsis font-medium sm:text-[1rem] text-[.8rem]">
                      {member.name}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ))
      )}
    </>
  );
}
