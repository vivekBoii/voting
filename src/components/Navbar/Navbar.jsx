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
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={{}}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://yt3.googleusercontent.com/ytc/AIdro_mWEbNetnKJzRnPGb3Mu4pYEM9auITPLxNC5tiF-hhZeR8=s160-c-k-c0x00ffffff-no-rj"
            className="h-8"
            alt="ECI"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Election Commision of India
          </span>
        </Link>
        {currentAccount ? (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => openNavigation()}
            >
              Account : "{currentAccount.slice(0, 10)}"
            </button>
            <div
              className={
                openNav
                  ? "z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  : "absolute top-14 right-6 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              }
              id="user-dropdown"
            >
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={{ pathname: "/" }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={{ pathname: "candidates-registration" }}
                  >
                    Candidate Registration
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={{ pathname: "allowed-voter" }}
                  >
                    Voter Registration
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={{ pathname: "voterList" }}
                  >
                    Voter List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
