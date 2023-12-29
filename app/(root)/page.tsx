import JobList from "@/components/shared/JobList";
import Navbar from "@/components/shared/Navbar";
import { Searchbar } from "@/components/shared/Searchbar";
import { getAllJobs } from "@/lib/actions/job.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const jobs = await getAllJobs({ query: "", page: 1, limit: 6 });

  return (
    <main className="mt-10 flex min-h-screen flex-col px-4 sm:px-12 md:px-28 lg:px-32 xl:px-64 2xl:px-96">
      <div className="flex w-full flex-col">
        <h1 className=" text-3xl">Browse Jobs</h1>
        <div className="my-5 flex justify-between">
          {/* <Searchbar /> */}
          <Link href="/jobs/create" className="">
            Post job
          </Link>
        </div>
      </div>
      <JobList
        data={jobs?.data}
        emptyTitle="No Jobs Found"
        collectionType="All_Jobs"
        limit={6}
        page={1}
        totalPages={2}
      />
    </main>
  );
}
