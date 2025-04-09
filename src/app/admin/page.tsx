import { AppSidebar } from "@/components/app-sidebar";
import DataTabs from "@/components/data-tabs";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <DataTabs />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
