"use client";

import {
  DashboardSidebarNav,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarNavMain>
          <DashboardSidebarNavLink href="/settings" active={isActive("/app/settings")}>
            Meu perfil
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/settings/theme"
            active={isActive("/app/settings/theme")}
          >
            Aparência
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/settings/billing"
            active={isActive("/app/settings/billing")}
          >
            Assinatura
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  );
}
