import { Aside } from "./modules/aside";
import Header from "./modules/header";
import { Outlet } from "react-router";
import useAuth from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  const isLogin = useAuth();
  return isLogin ? (
    <SidebarProvider>
      <Aside />
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        {/* <TabsBar /> */}
        <div className="bg-[var(--tabbar-foreground)] flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  ) : null;
}
