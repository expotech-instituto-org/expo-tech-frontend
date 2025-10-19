export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white h-[100vh] bg-[url(/images/LoginAdminBackground.png)] bg-fixed bg-clip-border bg-origin-border bg-center bg-no-repeat bg-cover">
      {children}
    </div>
  );
}
