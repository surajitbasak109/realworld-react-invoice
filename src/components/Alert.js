import React from "react";

const Alert = ({ type, text }) => {
  return (
    <div className="container">
      <div className={`alert alert-${type}`} role="alert">
        {text}
      </div>
    </div>
  );
};

export default Alert;
