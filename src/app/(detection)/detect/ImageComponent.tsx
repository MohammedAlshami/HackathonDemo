import React from "react";
import { Image } from "antd";

interface ImageProps {
  imageURL: string;
}
const ImageComponent = ({ imageURL }: ImageProps) => {
  return (
    <div className="h-[40rem]">
      <Image
        src={imageURL}
        alt="Rendered Output"
        width="100%"
        height="100%"
        className="   border-4 border-gray-300   object-cover rounded-xl"
      />
    </div>
  );
};

export default ImageComponent;
