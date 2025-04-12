import { AppSidebar } from "@/components/app-sidebar";
import DataTabs from "@/components/data-tabs";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { createTabDataStore } from "@/store/tabDataSlice";
import { TabDataContext } from "./tabBarContext";
import { useUserInfoStore } from "@/store/userInfoSlice";

export default function Page() {
  const tabData = JSON.parse(sessionStorage.getItem("tabData")!)?.state;
  const store = useRef(createTabDataStore(tabData)).current;
  const { setUserInfo } = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("t") || "";
    if (localStorage.getItem(token)) {
      const obj = JSON.parse(localStorage.getItem(token) || "");
      setUserInfo(obj);
    } else {
      navigate("/login");
    }
  }, [location.search]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <TabDataContext.Provider value={store}>
          <DataTabs />
        </TabDataContext.Provider>
        <div className="bg-[var(--tabbar-foreground)]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
