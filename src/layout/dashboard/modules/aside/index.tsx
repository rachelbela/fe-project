import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useUserPermission } from "@/store/userInfoSlice";
import { Permission } from "@/types/entity";
import { ArrowUpCircleIcon } from "lucide-react";
import { Link } from "react-router";

export function Aside() {
  const permissions = useUserPermission();

  // 递归生成菜单项
  const tree = (data: Permission[]) => {
    return data.map((item) => {
      if (item.children === undefined) {
        return (
          <div key={item.id}>
            <Link to={{ pathname: item.route }}>{item.name}</Link>
          </div>
        );
      } else {
        return (
          <div key={item.id}>
            <div>{item.name}</div>
            <SidebarMenuSub>
              <SidebarMenuSubItem>{tree(item.children)}</SidebarMenuSubItem>
            </SidebarMenuSub>
          </div>
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
          <div className="flex item-center">
            <ArrowUpCircleIcon className="h-5 w-5" />
            <span className="text-base font-semibold">Acme Inc.</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>{elements}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
