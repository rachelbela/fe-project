import { AppSidebar } from "@/components/app-sidebar";
import DataTabs from "@/components/data-tabs";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { createTabDataStore } from "@/store/tabDataSlice";
import { TabDataContext } from "./tabBarContext";

export default function Page() {
  const tabData = JSON.parse(sessionStorage.getItem("tabData")!)?.state;
  const store = useRef(createTabDataStore(tabData)).current;
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/workbench");
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <TabDataContext.Provider value={store}>
          <DataTabs />
        </TabDataContext.Provider>
        <div className="bg-[#F5F6F7]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
