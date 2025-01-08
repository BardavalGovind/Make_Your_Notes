import React from 'react';
import TagInput from '../components/TagInput';
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from 'axios';


const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([])

  const [error, setError] = useState(null);

  // add note
  const addNewNote = async ()=>{
      try{
        const token = localStorage.getItem('authToken');

        const response = await axios.post(
          "http://localhost:5000/add-note", 
          {
            title,
            content,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log(response);

        if(response.data && response.data.note){
            setError(null);
            alert(response.data.message);
            getAllNotes();
            onClose();
        }
      }
      catch(error){
          if(
            error.response &&
            error.response.data &&
            error.response.data.message
          ){
              setError(error.response.data.message);
          }
      }
  }

  // edit note
  const editNote = async ()=>{
    
  }

  const handleAddNote = ()=>{
    if(!title){
      setError("please enter the title");
      return;
    };

    if(!content){
      setError("please enter the content")
      return;
    }

    setError("");

    if(type === 'edit'){
      editNote();
    }
    else{
      addNewNote();
    }
  }
  return (


    <div className='relative'>
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
         type="text"
         className='text-2xl text-slate-950 outline-none'
         placeholder='Go To Gym At 5' 
         value={title}
         onChange={({ target }) => setTitle(target.value)}
         />
      </div>

      <div className='flex flex-col mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
         type="text"
         className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
         placeholder='Content'
         rows={10}
         value={content}
         onChange={({ target }) => setContent(target.value)}
         ></textarea>
      </div>

      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>

      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button
       className='bg-blue-500 font-medium mt-5 p-3 my-1 w-full rounded text-sm text-white'
       onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
    
  );
}

export default AddEditNotes;
