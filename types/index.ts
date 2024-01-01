// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== JOB PARAMS
export type CreateJobParams = {
  userId: string
  job: {
    imageUrl: string
    companyName: string
    title: string
    location: string
    description: string
    roles: string[]
    roleType: string
    datePosted: Date
    dateUpdated: Date
    featured: boolean
  }
  path: string
}

export type UpdateJobParams = {
  userId: string
  job: {
    _id: string
    imageUrl: string
    companyName: string
    title: string
    location: string
    description: string
    roles: string[]
    roleType: string
    datePosted: Date
    dateUpdated: Date
    featured: boolean
  }
  path: string
}

export type DeleteJobParams = {
  jobId: string
  path: string
}

export type GetAllJobsParams = {
  query: string
  limit: number
  page: number
}

export type GetJobsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type Job = {
  _id: string
  imageUrl: string
  companyName: string
  title: string
  location: string
  description: string
  roles: string[]
  roleType: string
  datePosted: Date
  dateUpdated: Date
  featured: boolean
  recruiter: {
    _id: string
    firstName: string
    lastName: string
  }
}

export type SaveJobParams = {
  userId?: string
  jobId: string
}

export type GetSavedJobsParams = {
  userId: string
}

export type DeleteSavedJobParams = {
  userId?: string
  jobId: string
  path: string
}

export type AppliedJobParams = {
  userId?: string
  jobId: string
}

export type GetAppliedJobsParams = {
  userId: string
}

export type DeleteAppliedJobParams = {
  userId?: string
  jobId: string
  path: string
}



// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  jobTitle: string
  jobId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  jobId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByJobParams = {
  jobId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}