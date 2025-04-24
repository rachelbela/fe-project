import DarkModeSwitch from "./dark-mode-switch";
import { useContext } from "react";
import { BreadcrumbDataContext } from "@/layout/dashboard/context/breadcrumbContext";
import MultiLanguage from "./multi-language";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { t } = useTranslation();
  const store = useContext(BreadcrumbDataContext);
  if (!store)
    throw new Error(t("missing-breadcrumbcontext-provider-in-the-tree"));

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex flex-1 justify-end">
          <MultiLanguage />
        </div>
        <DarkModeSwitch />
      </div>
    </header>
  );
}
