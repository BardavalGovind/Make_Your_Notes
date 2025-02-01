import React, { useState } from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';
import { GiNotebook } from 'react-icons/gi';  // Importing the notebook icon from Gi
import moment from 'moment';
import Modal from 'react-modal';

const NoteCard = ({ title, date, content, tags, onEdit, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="w-80 h-72 border rounded-lg p-6  shadow-xl hover:shadow-2xl bg-gradient-to-r from-orange-100 to-blue-100 transition-all transform hover:scale-105 flex flex-col justify-between relative focus:outline-none focus:ring-4 focus:ring-blue-500">
        {/* Enhanced Notebook Icon Size */}
        <div className="absolute top-4 left-4 text-gray-600 text-5xl">
          <GiNotebook />
        </div>

        {/* Centering the title and date */}
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          {/* Enhanced Title Size */}
          <h6 className="text-2xl font-semibold text-gray-900 text-center">{title}</h6>
          {/* Enhanced Date Size */}
          <span className="text-base text-gray-700">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        {/* Tags */}
        <div className="text-xs text-gray-200 flex flex-wrap gap-1 mt-4 justify-center">
          {tags.map((item, index) => (
            <span key={index} className="bg-white bg-opacity-30 text-white py-1 px-2 rounded-full">
              #{item}
            </span>
          ))}
        </div>

        {/* Interaction icons */}
        <div className="flex items-center justify-between mt-4">
          {/* Explore text on the left */}
          <div 
            className="text-center text-blue-600 font-bold text-lg cursor-pointer hover:text-yellow-300 transition-all duration-300 animate-pulse"
            onClick={() => setModalIsOpen(true)}
          >
            Explore 
            <span className="inline-block animate-arrow">
              {/* Adjusted Animated Arrow */}
              <span className="inline-block transform transition-all animate-pulse scale-75">{">"}</span>
              <span className="inline-block transform transition-all animate-pulse scale-75 delay-100">{">"}</span>
              <span className="inline-block transform transition-all animate-pulse scale-75 delay-200">{">"}</span>
            </span>
          </div>

          {/* Icons on the right */}
          <div className="flex gap-4">
            <MdCreate
              className="text-xl text-green-600 cursor-pointer hover:text-green-600 transition-all duration-200"
              onClick={onEdit}
            />
            <MdDelete
              className="text-xl text-red-600 cursor-pointer hover:text-red-600 transition-all duration-200"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>

      {/* Modal for detailed view */}
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className="w-2/3 h-2/3 bg-white rounded-lg shadow-lg p-6 mx-auto mt-20 overflow-y-auto relative"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <h2 className="text-xl font-bold text-gray-800 text-center">{title}</h2>
        <span className="text-sm text-gray-500 text-center block mt-2">{moment(date).format('Do MMM YYYY')}</span>
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