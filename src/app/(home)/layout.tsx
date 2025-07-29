import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import HomeSidebar from "@/modules/home/components/sidebar";
import HomeNavbar from "@/modules/home/components/navbar";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      className="container max-w-[1440px] m-auto"
      defaultOpen={false}
    >
      <HomeSidebar />
      <SidebarInset>
        <HomeNavbar />
        {children}
        {/* <HomeFooter /> */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomeLayout;
