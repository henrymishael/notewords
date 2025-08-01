import { Toaster } from "sonner";
import QueryProvider from "./query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "./sessionProvider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <QueryProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </Provider>
  );
};

export default Providers;
