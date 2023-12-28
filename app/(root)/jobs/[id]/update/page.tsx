import { DeleteModal } from "@/components/shared/DeleteModal";
import JobForm from "@/components/shared/JobForm";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

import { getJobById } from "@/lib/actions/job.actions";

const UpdateJob = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-gray-100 py-5 md:py-10">
        <h3 className="wrapper text-center text-xl font-bold sm:text-left">
          Update Job
        </h3>

        <div className="wrapper">
          <DeleteModal jobId={id} />
          <JobForm userId={userId} type="Update" />
        </div>
      </section>
    </>
  );
};

export default UpdateJob;
