import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-[#95A2EF]">
      <div className="wrapper flex h-28 items-center justify-between  px-10">
        <Link href="/" className="">
          <Image
            src="/assets/images/logo.jpeg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>

        <SignedIn>
          <nav className="hidden w-full max-w-xs md:flex">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <button className="rounded-full">
              <Link href="/sign-in">Login</Link>
            </button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
