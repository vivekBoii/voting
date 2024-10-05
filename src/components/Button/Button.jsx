import React from "react";

const Button = ({ btnName, handleClick }) => {
  return (
    <button
      className="mt-4 w-full bg-black hover:bg-gray-800 transition duration-200 font-medium rounded-lg text-white px-4 py-2"
      type="buttton"
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
