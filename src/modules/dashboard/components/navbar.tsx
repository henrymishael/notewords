import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MoveLeft, MoveRight, Search } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <nav className="h-16 flex items-center justify-between w-full px-4 border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <span className="p-2 bg-gray-200 rounded-lg">
            <MoveLeft />
          </span>
          <span className="p-2 bg-gray-200 rounded-lg">
            <MoveRight />
          </span>
        </div>
        <div className="relative flex items-center w-[250px]">
          <Search size={20} className="absolute left-2 text-black/40" />
          <Input type="search" className="pl-4 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button>Create</Button>
        <div className="w-10 h-10 rounded-full bg-gray-200  "></div>
      </div>
    </nav>
  );
}
