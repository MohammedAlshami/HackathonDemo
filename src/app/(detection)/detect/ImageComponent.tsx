import React, { useState } from "react";
import ReactDOM from "react-dom";

const ImageComponent = ({ imageURL }: ImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="">
        {!isModalOpen && (
          <img
            src={imageURL}
            alt="Rendered Output"
       
            className="border-4 h-[30rem] border-gray-300 object-cover rounded-xl"
            onClick={handleImageClick}
          />
        )}
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-64 z-[1000000000000]"
            onClick={handleCloseModal}
          >
            <div className="relative">
              <img
                src={imageURL}
                alt="Rendered Output"
                className="border-4 border-gray-300 object-cover rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageComponent;
