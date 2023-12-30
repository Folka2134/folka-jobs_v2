import { Document, Schema, model, models } from "mongoose";

export interface IJob extends Document {
  _id: string;
  imageUrl: string;
  companyName: string;
  title: string;
  location: string;
  description: string;
  roles: string[];
  roleType: string;
  datePosted: Date;
  dateUpdated: Date;
  featured: boolean;
  recruiter: { _id: string, firstName: string, lastName: string };
}

const JobSchema = new Schema({
  imageUrl: { type: String, required: true },
  companyName: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  roles: {type: [String], required: true },
  roleType: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  recruiter: { type: Schema.Types.ObjectId, ref: 'User' },
})

const SavedJobsSchema = new Schema({
  userId:{ type: Schema.Types.ObjectId, ref: 'User' },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
})

export const Job = models.Job || model('Job', JobSchema);

export const SavedJob = models.SavedJob || model("SavedJob", SavedJobsSchema)

// export default Job;