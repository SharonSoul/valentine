"use client"

import React from "react";
import { motion } from "framer-motion";

interface State {
  modalOpen: boolean;
  currentIndex: number;
  images: string[];
  noCount: number;
}

// Page component
class Page extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalOpen: false,
      currentIndex: 0,
      images: [
        "/images/next.svg",
        "/images/vercel.svg",
        "https://gifdb.com/images/high/animated-bear-kiss-enngnq0gm2r405bt.webp"
      ],
      noCount: 0
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  handleSwipe = (direction: "left" | "right") => {
    const { currentIndex, images } = this.state;
    let newIndex;
    if (direction === "left") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    this.setState({ currentIndex: newIndex });
  };

  getNoButtonText = () => {
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
      "You're breaking my heart😥😥😥"
    ];
    const { noCount } = this.state;
    return phrases[noCount % phrases.length];
  };

  render() {
    const { modalOpen, currentIndex, images } = this.state;

    return (
      <div className="flex flex-col items-center justify-center h-screen -mt-16">
        <img
          className="h-[200px]"
          src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          alt="Love Bear"
        />
        <h1 className="text-[2rem] text-center leading-tight md:text-5xl md:leading-snug bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 inline-block text-transparent bg-clip-text">
          Will you be my Valentine?
        </h1>
        <div className="text-center flex flex-wrap justify-center items-center">
          <div className="bg-gray-50 flex flex-col justify-center relative overflow-hidden p-6 mb-4 mx-2">
            <div className="max-w-md mx-auto">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                  <div className="space-y-2">
                    <p
                      className="text-slate-800"
                      onClick={() => this.handleSwipe("right")}
                    >
                      Yes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex flex-col justify-center relative overflow-hidden p-6 mb-4 mx-2">
            <div className="max-w-md mx-auto">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                  <div className="space-y-2">
                    <p
                      className="text-slate-800"
                      onClick={() =>
                        this.setState((prevState) => ({
                          noCount: prevState.noCount + 1
                        }))
                      }
                    >
                      {this.getNoButtonText()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">Memories</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={this.toggleModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="h-[200px]">
                    <motion.img
                      src={images[currentIndex]}
                      alt={`Image ${currentIndex + 1}`}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={this.toggleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default function HomePage() {
  return <Page />;
}
