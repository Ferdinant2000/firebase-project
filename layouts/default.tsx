export default function App({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container h-full mx-auto w-full flex items-center justify-center px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}
