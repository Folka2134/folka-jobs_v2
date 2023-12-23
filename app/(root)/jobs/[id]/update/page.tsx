import JobForm from "@/components/shared/JobForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const UpdateJob = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-gray-100 py-5 md:py-10">
        <h3 className="wrapper text-center text-xl font-bold sm:text-left">
          Update Job
        </h3>

        <div className="wrapper my-8">
          <JobForm userId={userId} type="Update" />
        </div>
      </section>
    </>
  );
};

export default UpdateJob;
