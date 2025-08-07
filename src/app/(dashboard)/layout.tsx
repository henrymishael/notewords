import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/components/navbar";
import { DashboardSidebar } from "@/modules/dashboard/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <div className="px-4 py-4 container mx-auto lg:px-11 lg:py-11">
          {children}
        </div>
      </SidebarInset>
      {/* <HomeFooter /> */}
    </SidebarProvider>
  );
};

export default DashboardLayout;
