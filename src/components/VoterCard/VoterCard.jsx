"use client";
import React from "react";
import Image from "next/image";

const VoterCard = ({ voterArray }) => {
  return (
    <div className="space-y-6">
      {voterArray.map((el, i) => (
        <div
          key={i + 1}
          className="flex items-center p-4 bg-indigo-800 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
        >
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={el[4]}
              alt="Voter Photo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="ml-4 text-white">
            <h2 className="text-xl font-semibold">
              {el[1]}
            </h2>
            <p className="text-sm">Address: {el[3].slice(0, 10)}..</p>
            <p className="text-sm font-semibold">
              {el[6] === true ? "You already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
