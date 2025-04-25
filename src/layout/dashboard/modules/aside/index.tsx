import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useUserPermission } from "@/store/userInfoSlice";
import { Permission } from "@/types/entity";
import { Link } from "react-router";
import IconifyIcon from "@/components/ui/iconify-icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SVGIcon from "@/components/ui/svgIcon";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Aside() {
  const permissions = useUserPermission();
  const { t } = useTranslation(["sys"]);

  // 递归生成菜单项
  const tree = (data: Permission[]) => {
    return data.map((item) => {
      if (item.children === undefined) {
        return (
          <div
            data-slot="sidebar-menu-item"
            data-sidebar="menu-item"
            className={cn("group/menu-item relative", "w-full")}
            key={item.id}
          >
            <SidebarMenuSubButton asChild>
              <div className="flex items-center">
                {item.icon && <IconifyIcon icon={item.icon} />}
                <Link to={{ pathname: item.route }}>{t(item.label)}</Link>
              </div>
            </SidebarMenuSubButton>
          </div>
        );
      } else {
        return (
          <Collapsible className="group/collapsible" key={item.id}>
            <CollapsibleTrigger className="flex space-x-1 items-center w-full">
              <div
                data-slot="sidebar-menu-item"
                data-sidebar="menu-item"
                className={cn("group/menu-item relative", "w-full")}
              >
                <SidebarMenuSubButton asChild>
                  <div className="flex items-center">
                    {item.icon && <IconifyIcon icon={item.icon} />}
                    <span className="flex-1 text-left">{t(item.label)}</span>
                    <div className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90">
                      <SVGIcon name="menu-collapse-arrow" size={8} />
                    </div>
                  </div>
                </SidebarMenuSubButton>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>{tree(item.children)}</SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        );
      }
    });
  };

  const elements = tree(permissions || []);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <div className="flex item-center text-black">
            <IconifyIcon icon="solar:shop-linear" size={24} />
            <span className="text-base font-semibold">Smartly</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu className="p-1">{elements}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter>官网</SidebarFooter>
    </Sidebar>
  );
}
