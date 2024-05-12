/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface FormData {
  title: string;
  description: string;
}
const page = () => {
  const navigate = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, control } = useForm<FormData>();
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
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit A New Isuue</Button>
      </form>
    </div>
  );
};

export default page;
