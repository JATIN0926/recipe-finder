import React from "react";

const NoResultFound = ({text}) => {
  return (
    <div className=" w-screen max-w-full h-full  flex flex-col items-center justify-center">
      <div className=" aspect-square w-[35%] relative">
        <img src="/images/empty-box.png" alt="no-result-found" className=" h-full w-full object-cover" />
      </div>
      <h1 className="text-4xl font-semibold">{text}</h1>
    </div>
  );
};

export default NoResultFound;
