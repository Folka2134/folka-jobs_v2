import { IJob } from "@/lib/database/models/job.model";
import { formatDateTime } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type CardProps = {
  job: IJob;
};

const JobCard = async ({ job }: CardProps) => {
  const user = await currentUser();

  return (
    <div className="transtion-all group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white py-2 shadow-md hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/jobs/${job._id}`}
        style={{ backgroundImage: `url(${job.imageUrl})` }}
        className="flex flex-grow justify-center bg-gray-50 bg-cover bg-center text-gray-500"
      />
      <Link
        href={`/jobs/${job._id}`}
        className="flex  flex-col gap-2 p-5 md:gap-4"
      >
        <div className="flex flex-col gap-2">
          {job.featured ? (
            <span className="rounded-full bg-[#C295F0] px-2 py-1 text-white transition-opacity duration-200 hover:opacity-90">
              Featured
            </span>
          ) : (
            ""
          )}
          <p className="text-gray-500">
            {formatDateTime(job.datePosted).dateTime}
          </p>
          <p className="line-clamp-2 flex-1 text-[16px] text-black md:text-[20px]">
            {job.title}
          </p>
          <p className="">
            by <span className="text-[#95A2F0]">{job.companyName}</span>
          </p>
        </div>
      </Link>
      {user?.publicMetadata.userId === job.recruiter._id && (
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
      )}
    </div>
  );
};

export default JobCard;
