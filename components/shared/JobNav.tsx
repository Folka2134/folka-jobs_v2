"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { JobNavLinks } from "@/constants";

const JobNav = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex h-28 items-center justify-between  px-10">
        <ul className="flex w-full flex-col gap-5 md:flex-row md:justify-center">
          {JobNavLinks.map((link) => {
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
      </div>
    </header>
  );
};

export default JobNav;
