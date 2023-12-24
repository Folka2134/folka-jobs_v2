"use server"

import { CreateJobParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Job from "../database/models/job.model"

const getRecruiterDetails = async (query: any) => {
  return query.populate({ path: "recruiter", model: User, select: "_id firstName lastName" })
}

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

export const getJobById = async (jobId: string) => {
  try {
    await connectToDatabase()

    const job = await getRecruiterDetails(Job.findById(jobId))

    if (!job) {
      throw new Error("Job not found")
    }

    return JSON.parse(JSON.stringify(job))
  } catch (error) {
    handleError(error)
  }
}