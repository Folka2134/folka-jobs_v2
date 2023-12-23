import * as z from "zod";

export const jobFormSchema = z.object({
  imageUrl: z.string().url({ message: "Invalid url" }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(50, {
    message: "Description must be less than 50 characters.",
  }),
  description: z.string().min(2).max(50),
  featured: z.boolean(),
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one role.",
  }),
  roleType: z.string({
    required_error: "You need to select a notification type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  datePosted: z.date(),
  dateUpdated: z.date(),
  appliedUsers: z.array(z.string())
});