export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img
        src="/images/Logo.svg"
        alt="Logo image"
        className="w-[10rem] align-middle self-center h-[30rem]"
      />
      <div className="bg-[var(--background)] h-full w-full rounded-tl-[var(--rounded-md)] rounded-tr-[var(--rounded-md)] px-12 py-12 flex flex-col gap-20  items-center">
        {children}
      </div>
    </div>
  );
}
