import AddEditNotes from "../pages/AddEditNotes";
import NoteCard from "../pages/NoteCard";
import Modal from "react-modal";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

const NoteCardRender = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const closeModal = () => {
        setOpenAddEditModal({ ...openAddEditModal, isShown: false });
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <NoteCard
                        title="meeting on 7th april"
                        date="3rd Apr 2024"
                        content="Meeting on 7th april meeting on 7th april"
                        tags="#Meeting"
                        onEdit={() =>
                            setOpenAddEditModal({
                                isShown: true,
                                type: "edit",
                                data: { title: "meeting on 7th april", content: "Meeting details" },
                            })
                        }
                        onDelete={() => console.log("Delete functionality triggered")}
                    />
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 absolute right-10 bottom-10"
                onClick={()=> {
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
                <AddEditNotes type={openAddEditModal.type} data={openAddEditModal.data} />
            </Modal>
        </>
    );
};

export default NoteCardRender;
