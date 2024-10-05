"use client";
import React from "react";
import Image from "next/image";

const Card = ({ candidateArray, giveVote }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidateArray && candidateArray.map((el, i) => {
        console.log(el);
        return (
          <div key={i + 1} className="bg-indigo-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden mr-4">
                <img src={el[3]} alt="profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {el[1]} #{Number(el[2])}
              </h2>
            </div>
            <p className="text-sm text-gray-300">Candidate Id: {Number(el[0])}</p>
            <p className="text-sm text-gray-300">Address: {el[5]}...</p>
            <p className="text-sm text-gray-300 mb-4">Total Votes: {Number(el[4])}</p>
            <button
              onClick={() => {
                giveVote({ id: Number(el[0]), address: el[5] });
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition duration-200"
            >
              Give Vote
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
