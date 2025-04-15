import * as React from "react";
import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

// This is sample data.
const data = {
  navMain: [
    {
      title: "management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "talk-library",
          url: "/talkLibrary",
        },
        {
          title: "people-management",
          url: "/peopleManagement",
        },
        {
          title: "customer-chat",
          url: "/customerChat",
        },
        {
          title: "workbench",
          url: "/workbench",
        },
        {
          title: "chat-history",
          url: "/list",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{t("company-name")}</span>
            <span className="truncate text-xs">{t("app-name")}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
