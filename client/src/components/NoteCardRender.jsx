import AddEditNotes from "../pages/AddEditNotes";
import NoteCard from "../pages/NoteCard";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
Modal.setAppElement("#root");

const NoteCardRender = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [allNotes, setAllNotes] = useState([]);

    const closeModal = () => {
        setOpenAddEditModal({ ...openAddEditModal, isShown: false });
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

    useEffect(() => {
        getAllNotes();
        return () => {};
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            onEdit={() =>
                                setOpenAddEditModal({
                                    isShown: true,
                                    type: "edit",
                                    data: { title: "meeting on 7th april", content: "Meeting details" },
                                })
                            }
                            onDelete={() => console.log("Delete functionality triggered")}
                        />
                    ))}
                </div>
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
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel="Add or Edit Notes Modal"
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes}
                />
            </Modal>
        </>
    );
};

export default NoteCardRender;
