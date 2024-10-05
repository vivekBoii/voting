"use client";
import React from "react";
import Image from "next/image";

const Card = ({ candidateArray, giveVote }) => {
  return (
    <div>
      {candidateArray && candidateArray.map((el, i) => {
        console.log(el)
      return (
        <div key={i+1}>
          <div>
            <div>
              <img src={el[3]} alt="profile" />
            </div>
            <div>
              <h2>
                {el[1]} #{Number(el[2])}
              </h2>
              <p>Candidate Id: {Number(el[0])}</p>
              <p>Address: {el[5]}..</p>
              <p>Total Vote {Number(el[4])}</p>
            </div>
            <div>
              <p>{el[4]}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  giveVote({ id: Number(el[0]), address: el[5] });
                }}
              >
                Give Vote
              </button>
            </div>
          </div>
        </div>
      )})}
    </div>
  );
};

export default Card;
