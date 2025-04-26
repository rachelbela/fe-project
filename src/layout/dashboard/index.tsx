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
      <SidebarInset className="max-h-screen">
        <Header />
        <Separator
          className="h-[1px] bg-[#EBEBEB] mx-9 box-border"
          style={{ width: "calc(100% - 72px)" }}
        ></Separator>
        <TabsBar />
        <div className="mx-5 flex-1 overflow-auto flex flex-col mb-6 items-center">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : null;
}
