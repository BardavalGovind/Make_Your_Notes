import React from 'react'
import TagInput from '../components/TagInput';
import { useState } from "react";

const AddEditNotes = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([])

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
         type="text"
         className='text-2xl text-slate-950 outline-none'
         placeholder='Go To Gym At 5' 
         />
      </div>

      <div className='flex flex-col mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
         type="text"
         className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
         placeholder='Content'
         rows={10}
         ></textarea>
      </div>

      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>

      <button className='bg-blue-500 font-medium mt-5 p-3 my-1 w-full rounded text-sm text-white'
       onClick={()=> {}}>
        ADD
      </button>
    </div>
    
  );
}

export default AddEditNotes;
