import { clsx, type ClassValue } from "clsx";
import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const _storageKeys = Object.freeze({
  token: "next-auth.afri-session",
});

export const _removeCookieItem = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};

export const onHandleSignout = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.sessionStorage.clear();
    _removeCookieItem(_storageKeys.token);
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  }
};
