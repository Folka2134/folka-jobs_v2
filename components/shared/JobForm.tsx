"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { jobFormSchema } from "@/lib/validator";
import { z } from "zod";
import { jobDefaultValues, jobRoles } from "@/constants";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createJob, updateJob } from "@/lib/actions/job.actions";
import { IJob } from "@/lib/database/models/job.model";

type JobFormProps = {
  userId: string;
  type: "Create" | "Update";
  job?: IJob;
  jobId?: string;
};

const JobForm = ({ userId, type, job, jobId }: JobFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    job && type === "Update" ? { ...job } : jobDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof jobFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImage = await startUpload(files);

      if (!uploadedImage) return;

      uploadedImageUrl = uploadedImage[0].url;
    }

    if (type === "Create") {
      console.log("trying to create");

      try {
        const newJob = await createJob({
          job: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });
        if (newJob) {
          form.reset();
          router.push(`/jobs/${newJob._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      console.log("trying to update");

      console.log(jobId);

      // if (!jobId) {
      //   router.back();
      //   return;
      // }
      // try {
      //   const updatedJob = await updateJob({
      //     job: {
      //       _id: jobId,
      //       ...values,
      //       imageUrl: uploadedImageUrl,
      //     },
      //     userId,
      //     path: `/jobs/${jobId}`,
      //   });

      //   if (updatedJob) {
      //     form.reset();
      //     router.push(`/jobs/${updatedJob._id}`);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Company name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Job title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Job location"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="rounded-xl"
                    {...field}
                    placeholder="Job description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roles"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Job roles</FormLabel>
                </div>
                {jobRoles.map((role) => (
                  <FormField
                    key={role.id}
                    control={form.control}
                    name="roles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={role.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(role.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, role.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== role.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {role.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Full-time" />
                      </FormControl>
                      <FormLabel className="font-normal">Full-time</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Part-time" />
                      </FormControl>
                      <FormLabel className="font-normal">Part-time</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
