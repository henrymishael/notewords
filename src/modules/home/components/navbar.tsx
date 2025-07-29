"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";

export const navlinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Product",
    href: "/product",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

const LargeDeviceMenu = () => {
  return (
    <div className="items-center gap-8 rounded-4xl md:flex hidden bg-accent px-10 h-14 ml-0 lg:ml-16 xl:lg-20">
      {navlinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-semibold text-base"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export const CtaButtons = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-6">
      <Link href="/signin">
        <Button
          className="w-full md:w-auto rounded-4xl text-amber-400 border-amber-400 font-semibold hover:text-amber-400/80 px-6 md:px-3 lg:px-6 h-14 md:h-12 lg:h-14"
          variant="outline"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/register">
        <Button className="w-full md:w-auto rounded-4xl bg-amber-400 text-white font-semibold hover:bg-amber-400/80 px-6 h-14 md:h-12 lg:h-14 md:px-3 lg:px-6">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

const HomeNavbar = () => {
  const sidebar = useSidebar();
  return (
    <nav className="h-20 md:h-26 flex px-4 lg:px-24">
      <div className="flex items-center justify-between w-full">
        <Link className="md:w-[135px]" href="/">
          <h1 className="text-2xl font-light">
            NOTE<span className="font-bold text-amber-400">WORDS</span>
          </h1>
        </Link>
        {/* <LargeDeviceMenu /> */}
        <div className="hidden md:flex">
          <CtaButtons />
        </div>
        <div className="md:hidden" onClick={() => sidebar.toggleSidebar()}>
          <MenuIcon />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
