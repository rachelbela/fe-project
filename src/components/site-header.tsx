import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavUser } from "./nav-user";
import { useUserInfoStore } from "@/store/userInfoSlice";
import DarkModeSwitch from "./dark-mode-switch";
import { useContext, useEffect } from "react";
import { BreadcrumbDataContext } from "@/app/admin/breadcrumbContext";
import { useStore } from "zustand";
import { useLocation } from "react-router";
import { routesTable } from "@/config/routes";

export function SiteHeader() {
  const { userInfo } = useUserInfoStore();
  const store = useContext(BreadcrumbDataContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  const { breadcrumbData, activateBreacrumb } = useStore(store);
  const location = useLocation();

  let items = [];
  for (let i = 0; i < breadcrumbData.length; i++) {
    const data = breadcrumbData[i];
    if (i === breadcrumbData.length - 1) {
      items.push(
        <BreadcrumbItem>
          <BreadcrumbPage>{data.name}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      items.push(
        <>
          <BreadcrumbItem>
            <BreadcrumbLink>{data.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
        </>
      );
    }
  }

  useEffect(() => {
    const item = routesTable.find((v) => v.pathname === location.pathname);
    if (!item) {
      throw Error("路由表中不存在该路径");
    } else {
      activateBreacrumb(item.path);
    }
  }, [location.pathname]);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>{items}</BreadcrumbList>
        </Breadcrumb>
        <DarkModeSwitch />
        {userInfo && (
          <div className="ml-auto flex items-center gap-2">
            <NavUser user={userInfo} />
          </div>
        )}
      </div>
    </header>
  );
}
