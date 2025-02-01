import React, { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { FaStickyNote } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import TagInput from '../components/TagInput';
import SpeechToText from './VoiceNote';

const AddEditNotes = ({ noteData, type, onClose, showMessage, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const addNewNote = async () => {
    try {
      const response = await axios.post("http://localhost:5000/notes/add-note", { title, content, tags, userId });
      if (response.data && response.data.note) {
        setError(null);
        showMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const editNote = async () => {
    try {
      const noteId = noteData._id;
      const response = await axios.put(`http://localhost:5000/notes/edit-note/${noteId}`, { title, content, tags, userId });
      if (response.data && response.data.note) {
        setError(null);
        showMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddOrEditNote = () => {
    if (!title) return setError("Please enter the title");
    if (!content) return setError("Please enter the content");
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        <div className="relative bg-gradient-to-r from-orange-200 to-blue-200 p-6 rounded-2xl shadow-2xl mx-auto border-4 max-w-3xl">
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center absolute -top-6 -right-6 bg-white shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
            onClick={onClose}
          >
            <MdClose className="text-2xl" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <FaStickyNote className="text-3xl text-yellow-500" />
            <h2 className="text-gray-800 text-3xl font-bold text-center font-handwritten">
              {type === "edit" ? "Edit Your Note" : "Create a New Note"}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="text-lg p-4 border rounded-xl focus:outline-none bg-white text-black mb-4 w-full"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="text-lg p-4 border rounded-xl focus:outline-none bg-white text-black"
              placeholder="Note Content"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ resize: "none" }}
            />
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="flex gap-4 justify-center mt-6">
            <button
              className="py-3 px-6 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300"
              onClick={handleAddOrEditNote}
            >
              {type === "edit" ? "Update Note" : "Add Note"}
            </button>

            <SpeechToText setContent={setContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;