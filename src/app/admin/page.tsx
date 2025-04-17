import { AppSidebar } from "@/components/app-sidebar";
import DataTabs from "@/components/data-tabs";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { createTabDataStore } from "@/store/tabDataSlice";
import { TabDataContext } from "./tabBarContext";
import { useUserInfoStore } from "@/store/userInfoSlice";
import { createBreadcrumbDataStore } from "@/store/breadcrumbSlice";
import { BreadcrumbDataContext } from "./breadcrumbContext";

export default function Page() {
  const tabData = JSON.parse(sessionStorage.getItem("tabData")!)?.state;
  const tabbarStore = useRef(createTabDataStore(tabData)).current;
  const { setUserInfo } = useUserInfoStore();
  const breadcrumbData = JSON.parse(
    sessionStorage.getItem("breadcrumbData")!
  )?.state;
  const breadcrumbStore = useRef(
    createBreadcrumbDataStore(breadcrumbData)
  ).current;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("t") || "";
    if (localStorage.getItem(token)) {
      const obj = JSON.parse(localStorage.getItem(token) || "");
      setUserInfo(obj);
      setIsLogin(true);
    } else {
      navigate("/login");
    }
  }, [location.search]);

  return isLogin ? (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <BreadcrumbDataContext.Provider value={breadcrumbStore}>
          <SiteHeader />
        </BreadcrumbDataContext.Provider>
        <TabDataContext.Provider value={tabbarStore}>
          <DataTabs />
        </TabDataContext.Provider>
        <div className="bg-[var(--tabbar-foreground)]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : null;
}
