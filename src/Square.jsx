import React from "react";
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      type="button"
      title="tile"
    >
      {props.value}
    </button>
  );
}

export default Square;
