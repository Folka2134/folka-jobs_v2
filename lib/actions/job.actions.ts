"use server"

import { CreateJobParams, DeleteJobParams, GetAllJobsParams, GetJobsByUserParams, SaveJobParams, UpdateJobParams, GetSavedJobsParams, AppliedJobParams, GetAppliedJobsParams, DeleteSavedJobParams, DeleteAppliedJobParams, IsSaveJobParams, IsAppliedJobParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { AppliedJob, Job, SavedJob } from "../database/models/job.model"
import { revalidatePath } from "next/cache"

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

export async function getJobsByUser({ userId, limit = 6, page }: GetJobsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { recruiter: userId }
    const skipAmount = (page - 1) * limit

    const jobsQuery = Job.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const jobs = await getRecruiterDetails(jobsQuery)
    const jobsCount = await Job.countDocuments(conditions)    

    return { data: JSON.parse(JSON.stringify(jobs)), totalPages: Math.ceil(jobsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

export const getAllJobs = async ({ query, limit=6, page} : GetAllJobsParams) => {
  try {
    await connectToDatabase()

    const conditions = {}

    const jobsQuery = Job.find(conditions).sort({ createdAt: "desc"}).skip(0).limit(limit)

    const jobs = await getRecruiterDetails(jobsQuery)
    const jobsCount = await Job.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(jobs)),
      totalPages: Math.ceil(jobsCount / limit),
    }
    
  } catch (error) {
    handleError(error)
  }
}

export async function updateJob({ userId, job, path }: UpdateJobParams) {
  try {
    await connectToDatabase()

    const jobToUpdate = await Job.findById(job._id)
    if (!jobToUpdate || jobToUpdate.recruiter !== userId) {
      throw new Error('Unauthorized or job not found')
    }

    const updatedJob = await Job.findByIdAndUpdate(
      job._id,
      { ...job },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedJob))
  } catch (error) {
    handleError(error)
  }
}

// SAVE JOB
export async function saveJob({ userId, jobId, path } : SaveJobParams) {
  try {
    await connectToDatabase()

    const savedJob = await SavedJob.findOneAndUpdate(
      { userId, jobId },
      { userId, jobId },
      { upsert: true, new: true, runValidators: true }
    );

    if(savedJob) revalidatePath(path)

    return JSON.parse(JSON.stringify(savedJob))
  } catch (error) {
    handleError(error)
  }
}

export async function getSavedJobsByUser({userId }: GetSavedJobsParams) {
  try {
    await connectToDatabase()

    const conditions = { userId: userId }

    const savedJobQuery = await SavedJob.find(conditions)
    
    const savedJobs = await Job.find({ _id: { $in: savedJobQuery.map((savedJob) => savedJob.jobId) } })
  
    return JSON.parse(JSON.stringify(savedJobs))
  } catch (error) {
    handleError(error)
  }
}

export const deleteSavedJob = async ({ userId, jobId, path }: DeleteSavedJobParams) => {
  try {
    await connectToDatabase()

    const deletedSavedJob = await SavedJob.findOneAndDelete({ jobId, userId  })
    
    if(deletedSavedJob) revalidatePath(path)
    
  } catch (error) {
    handleError(error)
  }  
}

export async function isJobSaved({ userId, jobId }: IsSaveJobParams) {
  try {
    await connectToDatabase();

    const savedJob = await SavedJob.findOne({ userId, jobId });

    return !!savedJob;
  } catch (error) {
    handleError(error);
    return false; 
  }
}

// APPLY TO JOB

export async function applyJob({ userId, jobId, path } : AppliedJobParams) {
  try {
    await connectToDatabase()

    const appliedJob = await AppliedJob.findOneAndUpdate(
      { userId, jobId },
      { userId, jobId },
      { upsert: true, new: true, runValidators: true }
    );

    if(appliedJob) revalidatePath(path)

    return JSON.parse(JSON.stringify(appliedJob))
  } catch (error) {
    handleError(error)
  }
}

export async function getAppliedJobsByUser({userId}: GetAppliedJobsParams) {
  try {
    await connectToDatabase()

    const appliedJobIds = await AppliedJob.find({ userId: userId })
    const appliedJobsWithDetails = await Job.find({ _id: { $in: appliedJobIds.map((appliedJob) => appliedJob.jobId) } })
  
    return JSON.parse(JSON.stringify(appliedJobsWithDetails))
  } catch (error) {
    handleError(error)
  }
}

export const deleteAppliedJob = async ({ userId, jobId, path }: DeleteAppliedJobParams) => {
  try {
    await connectToDatabase()

    const deletedAppliedJob = await AppliedJob.findOneAndDelete({ jobId, userId })
    
    if(deletedAppliedJob) revalidatePath(path)
    
  } catch (error) {
    handleError(error)
  }  
}


export async function isJobApplied({ userId, jobId }: IsAppliedJobParams) {
  try {
    await connectToDatabase();

    const appliedJob = await AppliedJob.findOne({ userId, jobId });

    return !!appliedJob;
  } catch (error) {
    handleError(error);
    return false; 
  }
}

export const deleteJob = async ({ jobId, path }: DeleteJobParams) => {
  try {
    await connectToDatabase()

    const deletedJob = await Job.findByIdAndDelete(jobId)
    
    if(deletedJob) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }  
}