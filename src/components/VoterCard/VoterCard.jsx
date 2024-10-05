"use client";
import React from "react";
import Image from "next/image";

const VoterCard = ({ voterArray }) => {
  return (
    <div>
      {voterArray.map((el, i) => (
        <div key={i + 1}>
          <div>
            <img src={el[4]} alt="" />
          </div>
          <div>
            <h2>
              {el[1]} #{Number(el[0])}
            </h2>
            <p>Address : {el[3].slice(0, 10)}..</p>
            <p>Details</p>
            <p>{el[6] == true ? "You already Voted" : "Not Voted"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
