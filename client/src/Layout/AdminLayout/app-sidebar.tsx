import {
  Calendar,
  FileText,
  Home,
  Inbox,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Products",
    url: "/admin/shop",
    icon: Home,
  },
  {
    title: "Product Categories",
    url: "/admin/product-categories",
    icon: Calendar,
  },
  {
    title: "Product Descriptions",
    url: "/admin/product-desc",
    icon: FileText,
  },
  {
    title: "Product Estimate Delivery Times",
    url: "/admin/product-estimate",
    icon: FileText,
  },
  {
    title: " Orders",
    url: "/admin/orders",
    icon: Settings,
  },
  {
    title: " Blog",
    url: "/admin/blog",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
