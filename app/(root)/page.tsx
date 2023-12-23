import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full items-center justify-center">
        <h1 className="flex-1 text-3xl">Browse Jobs</h1>
        <Link href="/jobs/create" className="">
          Post job
        </Link>
      </div>
    </main>
  );
}
