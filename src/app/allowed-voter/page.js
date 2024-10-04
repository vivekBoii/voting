"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VotingContext } from "../../context/voter";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import upload from "../../public/images/upload.png";
import creatorImg from "../../public/images/creator1.png";

const allowedVoter = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToIpfs, createVoter } = useContext(VotingContext);

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
                Name : <span>{formInput.name}</span>
              </p>
              <p>
                Add : <span>{formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                Pos : <span>{formInput.position}</span>
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
            {/* <div>
              {voterArray &&
                voterArray.map((el, i) => {
                  <div key={i + 1}>
                    <div>
                      <img src="" alt="Profile Photo" />
                    </div>
                    <div>
                      <p>Name</p>
                      <p>Address</p>
                      <p>Details</p>
                    </div>
                  </div>;
                })}
            </div> */}
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
              placeholder="Voter Name"
              handleClick={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Address"
              placeholder="Voter Address"
              handleClick={(e) =>
                setFormInput({ ...formInput, address: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Position"
              placeholder="Voter Position"
              handleClick={(e) =>
                setFormInput({ ...formInput, position: e.target.value })
              }
            />
            <div>
              <Button
                btnName="Authorized Voter"
                handleClick={() => {
                  createVoter(formInput, fileUrl, router);
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

export default allowedVoter;
