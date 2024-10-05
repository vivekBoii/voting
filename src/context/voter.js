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
  const [candidateArray, setCandidateArray] = useState([]);
  const [candidateIndex, setCandidateIndex] = useState([]);

  const [error, setError] = useState(null);
  const highestVote = [];

  const [voterArray, setVoterArray] = useState([]);
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
    getAllVoterData();
    getNewCandidate();
    checkIfWalletIsConnected();
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
      setError("Error in creating voter");
    }
  };

  const getAllVoterData = async () => {
    try {
      if (!connected) {
        await sdk?.connect();
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      const contract = fetchContract(signer);

      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);
      const allVoters = await Promise.all(
        voterListData.map((add) => contract.getVoterData(add))
      );

      setVoterArray(allVoters);
      setVoterLength(voterListData.length);
    } catch (error) {
      setError("Something went Wrong");
    }
  };

  const giveVote = async (id) => {
    try {
    } catch (error) {}
  };

  const setCandidate = async (candidateForm, fileUrl, router) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) {
        return setError("Input data is missing.");
      }

      // Connect to MetaMask
      if (!connected) {
        await sdk?.connect();
      }

      // Get the provider and signer using the MetaMask SDK
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      const contract = fetchContract(signer);

      // Upload file to IPFS
      const data = JSON.stringify({ name, address, image: fileUrl, age });
      const jsonBytes = new TextEncoder().encode(data);
      const result = await helia.fs.addBytes(jsonBytes);
      const url = `https://ipfs.io/ipfs/${result.toString()}`;
      console.log(url);

      const candidate = await contract.setCandidate(
        address,
        age,
        name,
        fileUrl,
        url
      );
      candidate.wait();
      console.log(candidate);
      router.push("/");
    } catch (error) {
      setError("Error in creating voter");
    }
  };

  const getNewCandidate = async () => {
    try {
      if (!connected) {
        await sdk?.connect();
      }

      // Get the provider and signer using the MetaMask SDK
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      const contract = fetchContract(signer);

      const allCandidateAddresses = await contract.getCandidates();

      const candidatesData = await Promise.all(
        allCandidateAddresses.map(async (address) => {
          const singleCandidateData = await contract.getCandidatedate(address);
          return singleCandidateData;
        })
      );

      setCandidateArray(candidatesData);
      const candidateIndexes = candidatesData.map((data) => Number(data[2]));
      setCandidateIndex(candidateIndexes);

      setCandidateLength(allCandidateAddresses.length);
    } catch (error) {
      setError("Error while getting new candidates");
      console.error(error); // Log the error for debugging
    }
  };

  const checkIfWalletIsConnected = async () => {};

  // Context value to provide
  const contextValue = {
    uploadToIpfs,
    createVoter,
    getAllVoterData,
    giveVote,
    setCandidate,
    getNewCandidate,
    checkIfWalletIsConnected,
    voterArray,
    error,
    candidateArray,
    voterLength,
    voterAddress,
    currentAccount,
    candidateLength,
  };

  return (
    <MetaMaskProvider>
      <VotingContext.Provider value={contextValue}>
        {children}
      </VotingContext.Provider>
    </MetaMaskProvider>
  );
};
