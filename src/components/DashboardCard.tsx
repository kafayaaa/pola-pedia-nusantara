interface DashboardCardProps {
  icon: React.ReactNode;
  count: number;
  title: string;
}

export default function DashboardCard({
  icon,
  count,
  title,
}: DashboardCardProps) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-brand-medium-gray/50 shadow-md">
      {icon}
      <h1 className="text-3xl font-bold">{count}</h1>
      <p className="text-brand-medium-gray">{title}</p>
    </div>
  );
}
