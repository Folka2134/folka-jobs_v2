import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-10 flex min-h-screen flex-col px-4 sm:px-12 md:px-28 lg:px-32 xl:px-64 2xl:px-96">
      <div className="flex w-full flex-col">
        <h1 className=" text-3xl">Browse Jobs</h1>
        <div className="my-5 flex justify-between">
          <div>*Search bar*</div>
          <Link href="/jobs/create" className="">
            Post job
          </Link>
        </div>
      </div>
      <div className="bg-blue-500">Job list</div>
    </main>
  );
}
