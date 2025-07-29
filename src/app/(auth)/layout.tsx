import { Loader } from "lucide-react";
import { ReactNode, Suspense } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col justify-center items-center  min-h-screen gap-6 w-full max-w-lg mx-auto   p-8">
          {children}
        </main>
      </div>
    </Suspense>
  );
};

export default AuthLayout;
