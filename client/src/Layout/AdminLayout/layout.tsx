import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { QueryProviders } from "@/Providers/QueryProviders";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProviders>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </QueryProviders>
  );
}
