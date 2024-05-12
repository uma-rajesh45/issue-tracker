import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const page = () => {
  return (
    <div className=' max-w-xl flex flex-col gap-3'>
        <TextField.Root placeholder='Title'/>
        <TextArea placeholder='description'/>
        <Button>Submit A New Isuue</Button>
    </div>
  )
}

export default page
