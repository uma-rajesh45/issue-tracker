'use client';
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm,SubmitHandler} from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { routeModule } from "next/dist/build/templates/app-page";

interface FormData {
  title: string;
  description: string;
}
const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register,handleSubmit,control } = useForm<FormData>();
  const onSubmit:SubmitHandler<FormData> =async (data)=>{
    await axios.post("/api/issues",data);
    navigate.push("/issues")
  }
  return (
    <form className=" max-w-xl flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
      control={control}
        name="description"
        render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
      />

      <Button>Submit A New Isuue</Button>
    </form>
  );
};

export default page;
