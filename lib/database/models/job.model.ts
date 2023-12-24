import { Schema, model, models } from "mongoose";

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
  recruiter: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Job = models.Job || model('Job', JobSchema);

export default Job;