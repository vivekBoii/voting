"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { VotingAddress, VotingAddressABI } from "./constant";
import { createHelia } from "helia";
import { fileToUint8Array } from "./heliaHelper";
import { unixfs } from "@helia/unixfs";
import { MemoryBlockstore } from "blockstore-core";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const { sdk, connected, account } = useSDK(); // MetaMask SDK hook
  const [currentAccount, setCurrentAccount] = useState(null);
  const [candidateLength, setCandidateLength] = useState(null);
  const [contract, setContract] = useState(null);
  const [helia, setHelia] = useState(null);
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  const [error, setError] = useState(null);
  const highestVote = [];

  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState(null);
  const [voterAddress, setVoterAddress] = useState(null);

  const router = useRouter();

  // Initialize Helia (IPFS)
  useEffect(() => {
    const initHelia = async () => {
      try {
        const blockstore = new MemoryBlockstore();
        const helia = await createHelia({ blockstore });
        const fs = unixfs(helia);
        setHelia({ helia, fs });
      } catch (error) {
        console.error("Error initializing Helia:", error);
      }
    };
    initHelia();
  }, []);

  // Fetch the smart contract
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

  // Example function to upload file to IPFS using Helia
  const uploadToIpfs = async (file) => {
    try {
      const fileBytes = await fileToUint8Array(file);
      const result = await helia.fs.addBytes(fileBytes); // Upload file bytes
      console.log("File added with CID:", result);
      return result.toString();
    } catch (error) {
      setError("Error uploading to IPFS:");
    }
  };

  const createVoter = async (formInput, fileUrl) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position) {
        return setError("Input data is missing.");
      }

      // Connect to MetaMask
      if (!connected) {
        await sdk?.connect();
      }

      // Get the provider and signer using the MetaMask SDK
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      console.log(signer);
      const contract = fetchContract(signer);
      console.log(contract);

      // Upload file to IPFS
      const data = JSON.stringify({ name, address, position, image: fileUrl });
      const jsonBytes = new TextEncoder().encode(data);
      const result = await helia.fs.addBytes(jsonBytes);
      const url = `https://ipfs.io/ipfs/${result.toString()}`;
      console.log(url);

      const voter = await contract.voterRight(address, name, url, fileUrl);
      voter.wait();
      console.log(voter);
      router.push("/voterList");
    } catch (error) {
      console.log(error);
      setError("Error in creating voter: " + error.message);
    }
  };

  const getAllVoterData = async () => {
    if (!connected) {
      await sdk?.connect();
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // Use await here
    const contract = fetchContract(signer);

    const voterListData = await contract.getVoterList();
    setVoterAddress(voterListData);
    voterListData.map(async (add) => {
      const singleVoterData = await contract.getVoterData(add);
      pushCandidate.push(singleVoterData);
    });
  };

  useEffect(() => {
    getAllVoterData();
  }, []);

  // Context value to provide
  const contextValue = {
    uploadToIpfs,
    createVoter,
  };

  return (
    <MetaMaskProvider>
      <VotingContext.Provider value={contextValue}>
        {children}
      </VotingContext.Provider>
    </MetaMaskProvider>
  );
};
