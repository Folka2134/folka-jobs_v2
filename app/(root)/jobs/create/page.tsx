import JobForm from "@/components/shared/JobForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const CreateJob = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  console.log(userId);

  return (
    <>
      <section className="bg-gray-100 py-5 md:py-10">
        <h3 className="wrapper text-center text-xl font-bold sm:text-left">
          Create Job
        </h3>

        <div className="wrapper">
          <JobForm userId={userId} type="Create" />
        </div>
      </section>
    </>
  );
};

export default CreateJob;
