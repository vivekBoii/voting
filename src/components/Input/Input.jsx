import React from "react";

const Input = ({ inputType, title, placeholder, handleClick }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white mb-1">{title}</label>
      {inputType === "text" ? (
        <div>
          <input
            className="placeholder-white p-3 rounded-md bg-pink-500 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 w-full"
            type="text"
            placeholder={placeholder}
            onChange={handleClick}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};


export default Input;
