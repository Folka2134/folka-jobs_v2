"use client";

import {
  applyJob,
  deleteAppliedJob,
  deleteSavedJob,
  saveJob,
} from "@/lib/actions/job.actions";
import React from "react";
import { usePathname } from "next/navigation";

type UserButtonProps = {
  buttonType: string;
  userId: string;
  jobId: string;
};

const handleButtonClick = (
  buttonType: string,
  userId: string,
  jobId: string,
  path: string,
) => {
  switch (buttonType) {
    case "Save":
      saveJob({ userId, jobId, path });
      console.log("Trying to save");
      break;
    case "Unsave":
      deleteSavedJob({ userId, jobId, path });
      console.log("Trying to unsave");
      break;
    case "Apply":
      applyJob({ userId, jobId, path });
      console.log("Trying to apply");
      break;
    case "Unapply":
      deleteAppliedJob({ userId, jobId, path });
      console.log("Trying to unapply");
      break;
  }
};

const UserButton = ({ buttonType, userId, jobId }: UserButtonProps) => {
  const path = usePathname();

  return (
    <button
      className="w-full"
      onClick={() => handleButtonClick(buttonType, userId, jobId, path)}
    >
      {buttonType}
    </button>
  );
};

export default UserButton;
