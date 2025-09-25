export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white">
      <img src="/images/Logo.svg" alt="" className="w-[50rem] h-[50rem]" />
      {children}
    </div>
  );
}
