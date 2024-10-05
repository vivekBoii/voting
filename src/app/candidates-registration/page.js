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

const candidatesRegistration = () => {
  const { uploadToIpfs, setCandidate, candidateArray } =
    useContext(VotingContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
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
    <div>
      <div>
        {fileUrl && (
          <div>
            <img src={fileUrl} alt="Voter Image" />
            <div>
              <p>
                Name : <span>{candidateForm.name}</span>
              </p>
              <p>
                Add : <span>{candidateForm.address.slice(0, 20)}</span>
              </p>
              <p>
                Age : <span>{candidateForm.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div>
            <div>
              <h4>Create candidate For Voting</h4>
              <p>Blockchain voting organization</p>
              <p>Contract Candidate</p>
            </div>
            <div>
              {candidateArray?.map((el, i) => (
                <div key={i + 1}>
                  <div>
                    <img src={el[3]} alt="Profile Photo" />
                  </div>
                  <div>
                    <p>
                      {el[1]} #{el[2]}
                    </p>
                    <p>{Number(el[0])}</p>
                    <p>Address : {el[5]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <div>
            <h1>Create New Voter</h1>
            <div>
              <div>
                <div {...getRootProps()}>
                  <input {...getInputProps()}></input>
                  <div>
                    <p>Upload File: JPG , PNG , GIF , WEBM MAX 5MB</p>
                    <div>
                      <Image src={upload} alt="File Upload" />
                    </div>
                    <p>Drag & Drop File</p>
                    <p>or Browse Media on your device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Input
              inputType="text"
              title="Name"
              placeholder="Candidate Name"
              handleClick={(e) =>
                setCandidateForm({ ...candidateForm, name: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Address"
              placeholder="Candidate Address"
              handleClick={(e) =>
                setCandidateForm({ ...candidateForm, address: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Age"
              placeholder="Candidate Age"
              handleClick={(e) =>
                setCandidateForm({ ...candidateForm, age: e.target.value })
              }
            />
            <div>
              <Button
                btnName="Authorized Candidate"
                handleClick={() => {
                  setCandidate(candidateForm, fileUrl, router);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <Image src={creatorImg} alt="user Profile" />
            <p>Notice for User</p>
            <p>
              Orgnizer <span>0x9399..</span>
            </p>
            <p>
              Only organizer of the voting contract can create and candidate for
              Voting election
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default candidatesRegistration;
