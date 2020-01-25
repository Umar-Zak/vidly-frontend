import React from "react";
const Like = props => {
  return (
    <i
      style={{ cursor: "pointer" }}
      className={props.liked ? "fa fa-heart" : "fa fa-heart-o"}
      aria-hidden="false"
      onClick={() => props.onAttacked(props.movie)}
    ></i>
  );
};

export default Like;
