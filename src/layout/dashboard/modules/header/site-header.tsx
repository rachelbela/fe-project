import DarkModeSwitch from "./dark-mode-switch";
import { useContext } from "react";
import { BreadcrumbDataContext } from "@/layout/dashboard/context/breadcrumbContext";
import MultiLanguage from "./multi-language";
import { useTranslation } from "react-i18next";
import { NavUser } from "./user";
import { useUserInfoStore } from "@/store/userInfoSlice";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  const { t } = useTranslation();
  const store = useContext(BreadcrumbDataContext);
  const { userInfo } = useUserInfoStore();
  const user = {
    name: userInfo?.username || "",
    avatar: userInfo?.avatar || "",
    email: userInfo?.email || "",
  };
  if (!store)
    throw new Error(t("missing-breadcrumbcontext-provider-in-the-tree"));

  return (
    <header className="ml-5 flex flex-col h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) text-xs">
      <div className="bg-white flex w-full h-full items-center gap-1 mp-4 lg:gap-2 lg:px-6">
        <div>首页</div>
        <div className="h-5 flex flex-1 justify-end space-x-4 items-center">
          <MultiLanguage />
          <DarkModeSwitch />
          <Separator orientation="vertical" />
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}
