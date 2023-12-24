"use server"

import { CreateJobParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import JobForm from "@/components/shared/JobForm"
import Job from "../database/models/job.model"

export const createJob = async ({ job, userId, path }: CreateJobParams) => {
  try {
    await connectToDatabase()

    const recruiter = await User.findById(userId)

    if (!recruiter) {
      throw new Error("Recruiter not found")
    }
   

    const newJob = await Job.create({ ...job, recruiter: userId})

    return JSON.parse(JSON.stringify(newJob))
  } catch (error) {
    handleError(error)
  }
}