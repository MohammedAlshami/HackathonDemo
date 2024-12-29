import React from "react";

interface CardComponentProps {
  classname: string;
  children?: React.ReactNode;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  classname,  
  children,
}) => {
  return (
    <div className={`w-full  border-black/10 border-2 rounded-xl ${classname}`}>
      {children}
    </div>
  );
};
