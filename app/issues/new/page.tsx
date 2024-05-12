/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";

type FormData = z.infer<typeof createIssueSchema>
const page = () => {
  const navigate = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, control,formState:{errors} } = useForm<FormData>({resolver:zodResolver(createIssueSchema)});
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      navigate.push("/issues");
      
    } catch (error) {
      setError(" The minimum length of the title or description should be 1.")
    }
  };
  return (
    <div className=" max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>
           {error}
          </Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" max-w-xl flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors&&<Text as="p" color="red">{errors.title?.message}</Text>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors&&<Text color='red' as="p">{errors.description?.message}</Text>}


        <Button>Submit A New Isuue</Button>
      </form>
    </div>
  );
};

export default page;
