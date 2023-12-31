"use client";

import { applyJob, saveJob } from "@/lib/actions/job.actions";
import React from "react";

type UserButtonProps = {
  buttonType: "Save" | "Unsave" | "Apply" | "Unapply";
  userId: string;
  jobId: string;
};

const handleButtonClick = (
  buttonType: string,
  userId: string,
  jobId: string,
) => {
  switch (buttonType) {
    case "Save":
      saveJob({ userId, jobId });
      console.log("Trying to save");
      break;
    case "Apply":
      applyJob({ userId, jobId });
      console.log("Trying to apply");
      break;
  }
};

const UserButton = ({ buttonType, userId, jobId }: UserButtonProps) => {
  return (
    <button onClick={() => handleButtonClick(buttonType, userId, jobId)}>
      {buttonType}
    </button>
  );
};

export default UserButton;
