import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <div className="ml-48 w-full">{children}</div>
    </main>
  );
}
