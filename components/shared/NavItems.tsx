"use client";

import React from "react";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col gap-5 md:flex-row md:justify-center">
      {NavLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.label}
            className={`${
              isActive && "underline underline-offset-4"
            } flex-center p-medium-16 whitespace-nowrap text-[#131833]`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
