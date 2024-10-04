import React from "react";

const Button = ({ btnName, handleClick }) => {
  return (
    <button type="buttton" onClick={handleClick}>
      {btnName}
    </button>
  );
};

export default Button;
