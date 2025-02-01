import React, { useState } from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';
import Modal from 'react-modal';

const NoteCard = ({ title, date, content, tags, onEdit, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="w-80 h-72 border rounded-lg p-5 bg-gradient-to-b from-blue-300 to-blue-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex flex-col justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-900">{title}</h6>
          <span className="text-xs text-gray-700">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-200 flex flex-wrap gap-1">
            {tags.map((item, index) => (
              <span key={index} className="bg-white bg-opacity-30 text-white py-1 px-2 rounded-full">
                #{item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MdCreate
              className="text-xl text-green-400 cursor-pointer hover:text-green-600 transition-all duration-200"
              onClick={onEdit}
            />
            <MdDelete
              className="text-xl text-red-400 cursor-pointer hover:text-red-600 transition-all duration-200"
              onClick={onDelete}
            />
          </div>
        </div>

        <div 
          className="text-center text-white font-bold text-lg mt-4 cursor-pointer hover:text-yellow-300 transition-all duration-300 animate-pulse"
          onClick={() => setModalIsOpen(true)}
        >
          Explore <span className="inline-block transform transition-all animate-pulse">→</span>
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className="w-2/3 h-2/3 bg-white rounded-lg shadow-lg p-6 mx-auto mt-20 overflow-y-auto relative"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">{moment(date).format('Do MMM YYYY')}</span>
        <p className="mt-4 text-gray-700 whitespace-pre-line overflow-y-auto max-h-80">{content}</p>

        {/* Fixed Close Button at Bottom-Right */}
        <button 
          className="absolute bottom-6 right-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default NoteCard;
