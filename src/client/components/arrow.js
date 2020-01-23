import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PrevArrow({ className, style, onClick }) {
  return (
    <FontAwesomeIcon
      icon="arrow-left"
      size="2x"
      className={className}
      style={{ ...style, marginLeft: 15 }}
      onClick={onClick}
    />
  );
}


function NextArrow({ className, style, onClick }) {
  return (
    <FontAwesomeIcon
      icon="arrow-right"
      size="2x"
      className={className}
      style={{ ...style, marginRight: 15 }}
      onClick={onClick}
    />
  );
}

export { PrevArrow, NextArrow };
