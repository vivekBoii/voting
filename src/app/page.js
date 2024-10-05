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

  useEffect(() => {
    console.log(candidateArray);
    console.log(voterLength);
  }, []);

  return (
    <div>
      {!currentAccount && (
        <div>
          <div>
            <div>
              <p>
                No candidate: <span>{candidateLength}</span>
              </p>
            </div>
            <div>
              <p>
                No Voter : <span>{voterLength}</span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <Countdown date={Date.now() + 100000} />
            </div>
          </div>
        </div>
      )}
      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
}
