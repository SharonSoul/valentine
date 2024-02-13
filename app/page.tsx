"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

// Modal component
const Modal = ({ isOpen, onClose, images }) => {
  if (!isOpen) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/*content*/}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">Memories</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            {/* Add your content here */}
            {/* For example, you can display images and videos */}
            <div className="h-[200px]">
              <motion.img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="h-full w-full object-cover"
                {...handlers}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // state for modal visibility
  const [images, setImages] = useState([
    // Add your image URLs here
    "/images/next.svg",
    "/images/vercel.svg",
    "https://gifdb.com/images/high/animated-bear-kiss-enngnq0gm2r405bt.webp",
  ]);

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure??🙄",
      "Really sure?🤔",
      "Are you positive???😶",
      "Please my love...🙏",
      "Just think about it🥺",
      "If you say no, I'll be very sad🙁",
      "I'll be very very sad😕",
      "I'll be very very very sad😓",
      "I'll be very very very very sad😖",
      "Ok fine😡, I'll stop asking...",
      "Just kidding, PLEASE SAY YES🙏",
      "I'll be very very very very very sad🥴",
      "You're breaking my heart😥😥😥",
    ];

    return phrases[noCount % phrases.length];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-16">
      {yesPressed && (
        <>
          <img
            src="https://gifdb.com/images/high/animated-bear-kiss-enngnq0gm2r405bt.webp"
            alt="Bear Kiss"
          />
          <div className="text-[2rem] font-bold text-center leading-tight md:text-5xl md:leading-snug  bg-gradient-to-tr from-blue-400 to-violet-400 to-red-400  p-1 inline-block text-transparent bg-clip-text">
            Thank you, Mariam! I love you! ❤️
          </div>
          {/* Button to prompt memories */}


          <div className="flex rounded-full mx-auto bg-gradient-to-tr from-violet-400 to-green-400 p-1 shadow-lg max-w-240px my-4">
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 font-bold md:text-xl bg-white px-6 py-3 rounded-full"
            >
              Prompt Memories
            </button>
          </div>
          {/* Modal component */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            images={images}
          />
        </>
      )}
      {!yesPressed && (
        <>
          <img
            src="https://gifdb.com/images/high/animated-bear-kiss-enngnq0gm2r405bt.webp"
            alt="Bear Kiss"
          />
          <h1 className="text-[2rem] text-center leading-tight md:text-5xl md:leading-snug bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 inline-block text-transparent bg-clip-text">
            Will you be my Valentine?
          </h1>

          <div className="text-center flex flex-wrap justify-center items-center">
            <div className="bg-gray-50 flex flex-col justify-center relative overflow-hidden p-6 mb-4 mx-2">
              <div className="max-w-md mx-auto">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                  </div>
                  <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                    <div className="space-y-2">
                      <p className="text-slate-800" style={{ fontSize: noCount * 20 + 16 }} onClick={() => setYesPressed(true)}>Yes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 flex flex-col justify-center relative overflow-hidden p-6 mb-4 mx-2">
              <div className="max-w-md mx-auto">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                  </div>
                  <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                    <div className="space-y-2">
                      <p className="text-slate-800" onClick={() => setNoCount(noCount + 1)}>{noCount === 0 ? "No 😥" : getNoButtonText()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
