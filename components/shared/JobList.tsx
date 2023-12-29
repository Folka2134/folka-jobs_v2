import { IJob } from "@/lib/database/models/job.model";
import React from "react";
import JobCard from "./JobCard";

type CollectionProps = {
  data: IJob[];
  emptyTitle: string;
  page: number | string;
  totalPages?: number;
  collectionType?: "Jobs_Created" | "Applied_Jobs" | "All_Jobs" | "Saved_Jobs";
  urlParamName?: string;
  limit: number;
};

const JobList = ({
  data,
  emptyTitle,
  page,
  totalPages,
  collectionType,
  urlParamName,
  limit,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((job) => (
              <li key={job._id} className="flex justify-center">
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-3 rounded-[14px] text-center">
          <h3 className="font-bold">{emptyTitle}</h3>
        </div>
      )}
    </>
  );
};

export default JobList;
