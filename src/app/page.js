"use client";
import React, { useContext, useEffect } from "react";
import { VotingContext } from "../context/voter";
import Card from "../components/Card/Card";
import Countdown from "react-countdown";

export default function HomePage() {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    currentAccount,
    getAllVoterData,
    voterLength,
  } = useContext(VotingContext);

  return (
    <section className="bg-purple-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div className="flex items-center justify-between w-full">
        <div className="flex space-x-4">
          <div className="bg-pink-600 text-white border-2 border-black px-6 py-4 flex justify-between items-center w-[200px]">
            <span className="text-sm font-bold">No Candidate:</span>
            <span className="text-xl font-mono">{candidateLength}</span>
          </div>
          <div className="bg-pink-600 text-white border-2 border-black px-6 py-4 flex justify-between items-center w-[200px]">
            <span className="text-sm font-bold">No Voter:</span>
            <span className="text-xl font-mono">{voterLength}</span>
          </div>
        </div>
        <div className="bg-black text-white px-12 py-6 my-2 border-2 border-black rounded-lg text-3xl font-mono">
          <Countdown date={Date.now() + 100000} />
        </div>
      </div>
      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </section>
  );
}
