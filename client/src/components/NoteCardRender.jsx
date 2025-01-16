import AddEditNotes from "../pages/AddEditNotes";
import NoteCard from "../pages/NoteCard";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
Modal.setAppElement("#root");
import { useNavigate } from "react-router-dom";
import Message from "./FeedbackMessage/Message";
import EmptyCard from "./EmptyCard/EmptyCard";
import AddNotesImg from "../images/addnote.jpg";
import NotesSearch from "./NotesSearch";

const NoteCardRender = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showMsg, setShowMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleEdit = (noteDetails)=>{
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    }

    const closeModal = () => {
        setOpenAddEditModal({ ...openAddEditModal, isShown: false });
    };

    const showMessage = (message, type)=>{
        setShowMsg({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseMsg = ()=>{
        setShowMsg((prev) => ({
            ...prev,
            isShown: false,
        }));
    };


    // Get all notes with authorization token
    const getAllNotes = async () => {
        try {
            const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
            if (!token) {
                console.log("Token is missing");
                return; // Token is missing, no need to proceed with the API request
            }

            const response = await axios.get("http://localhost:5000/get-all-notes", {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });

            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    //Delete Note
    const deleteNote = async (data) => {

        const noteId = data._id;
        const token = localStorage.getItem("authToken");
    
        setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));

        try{
           const response = await axios.delete(
            `http://localhost:5000/delete-note/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
              
    
          if(response.data && !response.data.error){
              showMessage("Note Deleted Successfully", 'delete');
              setError(null);
            //  await getAllNotes();
            
          }
        }
        catch(error){
            if(
              error.response &&
              error.response.data &&
              error.response.data.message
            ){
                console.log("An unexpected error occured. Please try again.");
            }
        }
    }

    //search for a Note
    const onSearchNote = async (query)=>{
        if(!query){
            console.log("Search query is empty, fetching all notes");
            getAllNotes();
        }
        else{
            try{

            const token = localStorage.getItem("authToken"); 

            if (!token) {
                console.log("Token is missing");
                return;
            }

            const response = await axios.get(
                "http://localhost:5000/search-notes", {
                    params: { query },
                    headers: { Authorization: `Bearer ${token}` },
                });

                if(response.data && response.data.notes){
                    setIsSearch(true);
                    setAllNotes(response.data.notes);
                }
            }
        
        catch(error){
            console.log(error);
        }
        }
    };

    useEffect(() => {
        getAllNotes();
        return () => {};
    }, []);

    return (
        <>
            
            <div className="container mx-auto">

                {/* Search Bar */}
                <NotesSearch onSearch={onSearchNote}/>


                {allNotes.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                        />
                    ))}
                </div>
                ) : (
                    <EmptyCard imgSrc={AddNotesImg} message={`Start creating your first note! Click on notes image to preapare notes. Let's get started!`}/>
                )}
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={closeModal}
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes}
                    showMessage={showMessage}
                />
            </Modal>

            <Message
                isShown = {showMsg.isShown}
                message={showMsg.message}
                type={showMsg.type}
                onClose={handleCloseMsg}
            />
        </>
    );
};

export default NoteCardRender;
