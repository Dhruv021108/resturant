import { DashboardView } from "@/components/dashboard-view";

export function generateStaticParams() {
  return [{ role: "owner" }, { role: "manager" }, { role: "customer" }];
}

export default function RoleDashboardPage({ params }) {
  return <DashboardView role={params.role} />;
}
