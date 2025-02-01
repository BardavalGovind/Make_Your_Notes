import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = ({ setContent }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setContent((prevContent) => prevContent + " " + transcript); // Append instead of replace
  };

  useEffect(() => {
    if (listening) {
      setContent((prevContent) => prevContent + " " + transcript);
    }
  }, [listening, transcript, setContent]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-red-500 text-sm">Your browser doesn't support speech recognition.</p>;
  }

  return (
    <div className="flex gap-4">
      <button
        className={`w-32 h-12 text-lg font-semibold flex items-center justify-center 
          rounded-xl shadow-md transition-all duration-300 
          ${listening ? 'bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}
        `}
        onClick={startListening}
      >
        Start
      </button>
      <button
        className="w-32 h-12 text-lg font-semibold flex items-center justify-center 
          rounded-xl shadow-md bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
        onClick={stopListening}
      >
        Stop
      </button>
    </div>
  );
};

export default SpeechToText;
