import React from "react";
import "./styles.scss";

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

const Segment = (props: Props) => {
  return (
    <div
      className={`segment-item ${props.isActive ? "segment-item-active" : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Segment;
