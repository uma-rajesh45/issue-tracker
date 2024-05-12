import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const page = () => {
  return (
    <div className=' max-w-xl flex flex-col gap-3'>
        <TextField.Root placeholder='Title'/>
        <SimpleMDE placeholder='description'/>
        <Button>Submit A New Isuue</Button>
    </div>
  )
}

export default page
