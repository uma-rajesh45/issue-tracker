/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import { ErrorMessege, Spinner } from "@/app/components/index";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type FormData = z.infer<typeof createIssueSchema>;
const page = async () => {
  const navigate = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(createIssueSchema) });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      navigate.push("/issues");
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
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessege>{errors.title?.message}</ErrorMessege>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessege>{errors.description?.message}</ErrorMessege>

        <Button disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Submit A New Isuue"}
        </Button>
      </form>
    </div>
  );
};

export default page;
