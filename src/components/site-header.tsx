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
import MultiLanguage from "./multi-language";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { t } = useTranslation();

  const { userInfo } = useUserInfoStore();
  const store = useContext(BreadcrumbDataContext);
  if (!store)
    throw new Error(t("missing-breadcrumbcontext-provider-in-the-tree"));
  const { breadcrumbData, activateBreacrumb } = useStore(store);
  const location = useLocation();

  let items = [];
  for (let i = 0; i < breadcrumbData.length; i++) {
    const data = breadcrumbData[i];
    if (i === breadcrumbData.length - 1) {
      items.push(
        <BreadcrumbItem key={data.link}>
          <BreadcrumbPage>{t(data.name)}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      items.push(
        <>
          <BreadcrumbItem key={data.link}>
            <BreadcrumbLink>{t(data.name)}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            key={"separator" + data.link}
            className="hidden md:block"
          />
        </>
      );
    }
  }

  useEffect(() => {
    const item = routesTable.find((v) => v.pathname === location.pathname);
    if (!item) {
      throw Error(t("can-not-find-the-path-in-routes"));
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
        <div className="flex flex-1 justify-end">
          <MultiLanguage />
        </div>
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
