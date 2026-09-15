import { Sidebar } from "@/components/skillhive/Sidebar";

export default function SkillHiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-cream sm:flex">
      <Sidebar />
      <div className="min-w-0 flex-1 p-5 sm:p-8">{children}</div>
    </div>
  );
}
