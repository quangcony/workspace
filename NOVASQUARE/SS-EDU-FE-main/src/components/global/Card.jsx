import React from "react";

const Card = ({ title = "", children }) => {
  return (
    <div className="card">
      <div className="card-body">
        {title && <h6 className="card-title">{title}</h6>}
        {children}
      </div>
    </div>
  );
};

export default Card;
