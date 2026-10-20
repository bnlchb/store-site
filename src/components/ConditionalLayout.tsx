"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { SelectionProvider } from "@/contexts/SelectionContext";
import { SiteFooter } from "@/components/originalfit/SiteFooter";
import { SiteHeader } from "@/components/originalfit/SiteHeader";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <SelectionProvider>
      <div className="of-site flex min-h-screen flex-col bg-bone">
        <SiteHeader />
        <main className="flex-1 pt-[72px]">{children}</main>
        <SiteFooter />
      </div>
    </SelectionProvider>
  );
}
