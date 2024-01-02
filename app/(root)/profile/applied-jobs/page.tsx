import JobList from "@/components/shared/JobList";
import { Button } from "@/components/ui/button";
import { getAppliedJobsByUser } from "@/lib/actions/job.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AppliedJobsPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const appliedJobs = await getAppliedJobsByUser({ userId });

  return (
    <>
      <section className="bg-gray-50 py-5 md:py-10">
        <div className="wrapper flex items-center  justify-center sm:justify-between">
          <h3 className="text-center font-bold sm:text-left">Applied Jobs</h3>
          <Button asChild className="hidden sm:flex">
            <Link href="/#jobs">Find More Jobs</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <JobList
          data={appliedJobs}
          emptyTitle="No Applied Jobs"
          collectionType="Applied_Jobs"
          limit={6}
          page={1}
          totalPages={2}
          // urlParamsName="jobsPage"
        />
      </section>
    </>
  );
};

export default AppliedJobsPage;
