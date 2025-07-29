import type { ReactNode } from "react";

import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Prefix?: ReactNode;
  containerClassName?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      Prefix,
      containerClassName,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <div className="w-full">
        <label htmlFor={props.name} className="text-sm">
          {label}
        </label>

        <div
          className={cn(
            "flex items-center rounded-md border border-slate-200 bg-white h-[2.75rem] px-3",
            containerClassName
          )}
        >
          {Prefix && <div className="pr-2">{Prefix}</div>}
          <input
            type={
              type === "password"
                ? passwordVisible
                  ? "text"
                  : "password"
                : type
            }
            className={cn(
              "w-full bg-white text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
              className
            )}
            ref={ref}
            {...props}
          />

          {type === "password" && (
            <div onClick={() => setPasswordVisible((value) => !value)}>
              {passwordVisible ? (
                <Eye size={18} className="text-slate-500" />
              ) : (
                <EyeOff size={18} className="text-slate-500" />
              )}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-600 text-xs pt-2">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
