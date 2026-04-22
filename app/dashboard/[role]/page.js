"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { DashboardView } from "@/components/dashboard-view";
import { useApp } from "@/components/app-provider";

export function generateStaticParams() {
  return [{ role: "owner" }, { role: "manager" }, { role: "customer" }];
}

export default function RoleDashboardPage() {
  const params = useParams();
  const role = params.role;
  const { user } = useApp();

  const allowed = useMemo(() => {
    if (!user) return false;
    if (user.role === "owner") return true;
    return user.role === role;
  }, [role, user]);

  return <DashboardView role={role} allowed={allowed} />;
}
