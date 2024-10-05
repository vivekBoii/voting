"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { VotingContext } from "../../context/voter";
import loading from "../../public/loading-waiting.gif";

const Navbar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);

  const openNavigation = () => setOpenNav(!openNav);
  return (
    <div>
      {error == "" ? (
        ""
      ) : (
        <div>
          <div>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div>
        <div>
          <Link href={{ pathname: "/" }}>
            <img src={loading} alt="" />
          </Link>
        </div>
        <div>
          {currentAccount ? (
            <div>
              <div>
                <button onClick={() => openNavigation()}>
                  {currentAccount.slice(0, 10)}..
                </button>
                {currentAccount && (
                  <span>
                    {open ? (
                      <AiFillUnlock onClick={() => openNavigation()} />
                    ) : (
                      <AiFillLock onClick={() => openNavigation()} />
                    )}
                  </span>
                )}
              </div>
              {openNav && (
                <div>
                  <p>
                    <Link href={{ pathname: "/" }}>Home</Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "candidates-registration" }}>
                      Candidate Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "allowed-voter" }}>
                      Voter Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "voterList" }}>Voter List</Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
