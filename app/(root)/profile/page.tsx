import JobList from "@/components/shared/JobList";
import { Button } from "@/components/ui/button";
import { getJobsByUser, getSavedJobsByUser } from "@/lib/actions/job.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const recruitersJobs = await getJobsByUser({ userId, page: 1 });
  const savedJobs = await getSavedJobsByUser({ userId });
  // const usersSavedJobs =
  const appliedJobs = "#";

  console.log(savedJobs);

  return (
    <>
      {/* Saved Jobs */}
      <section className="bg-gray-50 py-5 md:py-10">
        <div className="wrapper flex items-center  justify-center sm:justify-between">
          <h3 className="text-center font-bold sm:text-left">Saved Jobs</h3>
          <Button asChild className="hidden sm:flex">
            <Link href="/#jobs">Find More Jobs</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <JobList
          data={savedJobs}
          emptyTitle="No Saved Jobs"
          collectionType="Saved_Jobs"
          limit={6}
          page={1}
          totalPages={2}
          // urlParamsName="jobsPage"
        />
      </section>

      {/* Applied Jobs */}
      <section className="bg-gray-50 py-5 md:py-10">
        <div className="wrapper flex items-center  justify-center sm:justify-between">
          <h3 className="text-center font-bold sm:text-left">Applied Jobs</h3>
          <Button asChild className="hidden sm:flex">
            <Link href="/#jobs">Find More Jobs</Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
        <JobList
          data={jobs?.data}
          emptyTitle="No Applied Jobs"
          collectionType="Applied_Jobs"
          limit={6}
          page={1}
          totalPages={2}
          urlParamsName="jobsPage"
        />
      </section> */}

      {/* Jobs Posted */}
      <section className="bg-gray-50 py-5 md:py-10">
        <div className="wrapper flex items-center  justify-center sm:justify-between">
          <h3 className="text-center font-bold sm:text-left">Posted Jobs</h3>
          <Button asChild className="hidden sm:flex">
            <Link href="/jobs/create">Create Job Post</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <JobList
          data={recruitersJobs?.data}
          emptyTitle="No Jobs Created"
          collectionType="Jobs_Created"
          limit={6}
          page={1}
          totalPages={2}
          // urlParamsName="jobsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
