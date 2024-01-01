import Image from "next/image";

import {
  getJobById,
  isJobApplied,
  isJobSaved,
} from "@/lib/actions/job.actions";
import { SearchParamProps } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import UserButton from "@/components/shared/UserButton";
import { useState } from "react";
import { SavedJob } from "@/lib/database/models/job.model";
import Link from "next/link";

const JobPage = async ({ params: { id } }: SearchParamProps) => {
  const jobId = id;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const job = await getJobById(id);

  const jobIsSaved = await isJobSaved({ userId, jobId });
  const jobIsApplied = await isJobApplied({ userId, jobId });

  const tagColours = ["#95DCF0", "#C295F0", "#95BFF0", "#A495F0", "#95A2EF"];

  return (
    <section className="flex justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={job.imageUrl}
          alt={job.title}
          width={500}
          height={800}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex flex-row items-center gap-3">
              <p className="">
                by{" "}
                <span className="text-[#95A2F0]">
                  {`${job.recruiter.firstName} ${job.recruiter.lastName}`} |{" "}
                  {job.companyName}
                </span>
              </p>
              <div className="flex gap-3">
                {job.recruiter._id === userId && !job.featured ? (
                  <button className="text-black">Feature Job!</button>
                ) : job.featured ? (
                  <span className="rounded-full bg-[#C295F0] px-2 py-1 text-white transition-opacity duration-200 hover:opacity-90">
                    Featured
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {job.recruiter._id === userId ? (
              <Link
                href={`/jobs/${job._id}/update`}
                className="flex justify-center gap-2"
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
                <button>Update</button>
              </Link>
            ) : (
              <div className="flex w-full gap-2">
                {jobIsApplied ? (
                  <UserButton buttonType="Unapply" userId={userId} jobId={id} />
                ) : (
                  <UserButton buttonType="Apply" userId={userId} jobId={id} />
                )}
                {jobIsSaved ? (
                  <UserButton buttonType="Unsave" userId={userId} jobId={id} />
                ) : (
                  <UserButton buttonType="Save" userId={userId} jobId={id} />
                )}
              </div>
            )}

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <div>
                  <p className="ml-1">
                    {formatDateTime(job.datePosted).dateOnly}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={20}
                  height={20}
                />

                <p className="ml-1">{job.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-600">Job Description</p>
              <p className="text-gray-500">{job.description}</p>
            </div>
            <div className="flex">
              <ul>
                {job.roles.map((role: any, indx: any) => (
                  <li
                    key={indx}
                    className={`bg-[${tagColours[indx]}] rounded-full px-3 py-1 text-white`}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPage;
