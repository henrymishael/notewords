import { Loader } from "lucide-react";
import { ReactNode, Suspense } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex flex-col justify-center items-center  min-h-screen gap-6 w-full max-w-lg mx-auto   p-8">
            <h1 className="text-2xl font-light">
              NOTE<span className="font-bold text-amber-400">WORDS</span>
            </h1>
            {children}
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default AuthLayout;
