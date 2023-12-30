"use client";

import { saveJob } from "@/lib/actions/job.actions";
import React from "react";

type UserButtonProps = {
  buttonType: "Save Job" | "Apply To Job";
  userId: string;
  jobId: string;
};

const UserButton = ({ buttonType, userId, jobId }: UserButtonProps) => {
  return (
    <button onClick={() => saveJob({ userId: userId, jobId: jobId })}>
      {buttonType}
    </button>
  );
};

export default UserButton;
