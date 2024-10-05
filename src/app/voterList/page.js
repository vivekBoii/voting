"use client";
import React, { useEffect, useContext } from "react";
import VoterCard from "../../components/VoterCard/VoterCard";
import { VotingContext } from "../../context/voter";

const VoterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-indigo-800 text-white">
      <div className="bg-indigo-900 px-4 py-8 mx-auto max-w-screen-xl rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Voter List</h1>
        <VoterCard voterArray={voterArray} />
        {!voterArray && (
          <div className="text-white text-lg text-center">
            No Voter Available
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterList;
