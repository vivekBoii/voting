"use client";
import React, { useEffect , useContext } from "react";
import VoterCard from "../../components/VoterCard/VoterCard";
import { VotingContext } from "../../context/voter";

const VoterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div>
      <VoterCard voterArray={voterArray} />
    </div>
  );
};

export default VoterList;
