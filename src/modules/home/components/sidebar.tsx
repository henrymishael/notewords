"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import React, { ComponentProps } from "react";
import { CtaButtons } from "./navbar";
import { X } from "lucide-react";

const HomeSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const sidebar = useSidebar();

  return (
    <Sidebar {...props} side="right">
      <div className="h-full flex flex-col bg-gradient-to-b from-[#F0F8FF] to-[#E5FFFD1A]">
        <SidebarHeader>
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-light">
              Note<span className="font-bold text-amber-400">WORDS</span>
            </h1>
            <X onClick={() => sidebar.toggleSidebar()} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* <SidebarMenu>
            <div className="flex flex-col gap-6 px-6 py-4">
              {navlinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton className="py-5 hover:bg-[#00BFB2]/20 rounded-none ">
                    <Link href={link.href} className="text-xl font-medium">
                      {link.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          </SidebarMenu> */}
          <div className="px-6 py-4">
            <CtaButtons />
          </div>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default HomeSidebar;
