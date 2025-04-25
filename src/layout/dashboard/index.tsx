import { Aside } from "./modules/aside";
import Header from "./modules/header";
import { Outlet } from "react-router";
import useAuth from "@/hooks/use-auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TabsBar from "./modules/tabs-bar";
import { Separator } from "@radix-ui/react-separator";

export default function DashboardLayout() {
  const isLogin = useAuth();
  return isLogin ? (
    <SidebarProvider>
      <Aside />
      <SidebarInset>
        <Header />
        <Separator
          className="h-[1px] bg-[#EBEBEB] mx-9 box-border"
          style={{ width: "calc(100% - 72px)" }}
        ></Separator>
        <TabsBar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ) : null;
}
