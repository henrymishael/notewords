import { Toaster } from "sonner";
import QueryProvider from "./query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
};

export default Providers;
