import { Avatar } from "@mui/material";

interface IMember {
  name: string;
  photo?: string;
}

interface IMembersProps {
  Class: string;
  Members: IMember[];
}

export function MembersComponent({ Class, Members }: IMembersProps) {
  return (
    <div className="bg-[url(/images/bg-equipe.png)] bg-clip-border bg-origin-border bg-cover rounded-[.5rem] bg-left bg-no-repeat min-w-full min-h-fit pb-[.8rem]">
      <p className="pl-[3rem] py-[.8rem] font-medium text-[var(--azul-primario)]">
        {Class}
      </p>
      <div className="grid grid-cols-2 gap-y-5 ">
        {Members.map((member, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-self-center"
          >
            <Avatar
              src={member.photo}
              alt={member.name}
              className="  absolute -right-8 -bottom-6 -translate-y-1/2"
            />
            <div className="bg-[var(--azul70)] text-white rounded-[10px] py-2  pl-9 pr-3 sm:w-[90%] overflow-hidden whitespace-nowrap text-ellipsis font-medium sm:text-[1rem] w-[60%] text-[.8rem]">
              {member.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
