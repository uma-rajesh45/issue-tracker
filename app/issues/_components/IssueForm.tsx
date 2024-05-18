"use client";
import { ErrorMessege, Spinner } from "@/app/components/index";
import { issueSchema } from "@/app/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from 'react-simplemde-editor';

type FormData = z.infer<typeof issueSchema>;
const IssueForm = ({ issue }: { issue?: issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(issueSchema) });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError(" The minimum length of the title or description should be 1.");
    }
  };
  return (
    <div className=" max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" max-w-xl flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessege>{errors.title?.message}</ErrorMessege>
        <Controller
          defaultValue={issue?.description}
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessege>{errors.description?.message}</ErrorMessege>

        <Button disabled={isSubmitting}>
          {issue ? "Update The Issue" : "Submit The Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
