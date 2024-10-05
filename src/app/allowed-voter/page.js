"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VotingContext } from "../../context/voter";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import upload from "../../public/images/upload.png";
import creatorImg from "../../public/images/creator1.png";

const allowedVoter = () => {
  const { uploadToIpfs, createVoter, voterArray } =
    useContext(VotingContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();

  const onDrop = useCallback(async (acceptedFile) => {
    const cid = await uploadToIpfs(acceptedFile[0]);
    const url = `https://ipfs.io/ipfs/${cid}`;
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className="min-h-screen p-10 text-white">
      <div className="bg-purple-900 px-4 mx-auto max-w-screen-xl">
        <div className="flex gap-10 my-10">
          <div>
            {fileUrl && (
              <div className="bg-pink-600 p-6 m-4 rounded-lg shadow-lg text-white">
                <img
                  src={fileUrl}
                  alt="Voter Image"
                  className="rounded-md mb-4"
                />
                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    Name:{" "}
                    <span className="text-white font-bold">
                      {formInput.name}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    Address:{" "}
                    <span className="text-white font-bold">
                      {formInput.address.slice(0, 20)}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    Position:{" "}
                    <span className="text-white font-bold">
                      {formInput.position}
                    </span>
                  </p>
                </div>
              </div>
            )}
            {!fileUrl && (
              <div className="bg-pink-600 p-6 m-4 rounded-lg shadow-lg text-white">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-2">
                    Create Voter For Election
                  </h4>
                  <p className="text-lg">Already Registered Voter</p>
                </div>

                <div className="space-y-4">
                  {voterArray?.map((el, i) => (
                    <div
                      key={i + 1}
                      className="flex items-center p-4 bg-indigo-800 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                    >
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={el[4]}
                          alt="Profile Photo"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-xl font-semibold">
                          {el[1]}
                        </p>
                        <p className="text-sm text-gray-300">
                          Address: {el[3].slice(0, 15)}..
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 bg-pink-600 p-6 m-4 rounded-lg shadow-lg text-white">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Create New Voter
            </h1>

            <div className="mb-6">
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-white p-4 rounded-lg text-center cursor-pointer hover:bg-pink-500 transition duration-200"
              >
                <input {...getInputProps()} className="hidden" />
                <p className="text-lg">
                  Upload File: JPG, PNG, GIF, WEBM MAX 5MB
                </p>
                <div className="mt-2 mb-4">
                  <Image src={upload} alt="File Upload" className="mx-auto" />
                </div>
                <p className="text-lg">Drag & Drop File</p>
                <p className="text-sm text-gray-300">
                  or Browse Media on your device
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                inputType="text"
                title="Name"
                placeholder="Voter Name"
                handleClick={(e) =>
                  setFormInput({ ...formInput, name: e.target.value })
                }
                className="p-2 rounded-md bg-pink-500 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Input
                inputType="text"
                title="Address"
                placeholder="Voter Address"
                handleClick={(e) =>
                  setFormInput({
                    ...formInput,
                    address: e.target.value,
                  })
                }
                className="p-2 rounded-md bg-pink-500 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Input
                inputType="text"
                title="Position"
                placeholder="Voter Position"
                handleClick={(e) =>
                  setFormInput({ ...formInput, position: e.target.value })
                }
              />
              <div className="text-center">
                <Button
                  btnName="Authorize Voter"
                  handleClick={() => {
                    createVoter(formInput, fileUrl, router);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-pink-600 p-4 rounded-lg shadow-md mt-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src={creatorImg}
              alt="User Profile"
              className="w-24 h-24 rounded-full border-2 border-white mb-4"
            />
            <p className="text-white text-lg font-semibold">Notice for User</p>
            <p className="text-white text-sm mt-2">
              Organizer: <span className="font-medium">0x5fbdb2315..</span>
            </p>
            <p className="text-white text-sm mt-2">
              Only the organizer of the voting contract can create and register
              candidates for the voting election.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default allowedVoter;
