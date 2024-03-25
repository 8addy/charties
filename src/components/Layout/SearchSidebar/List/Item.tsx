import React from "react";
import { SERIE } from "../../../../types/types";

type Props = {
  item: SERIE;
  isSelected: boolean;
  handleClick: (serie: SERIE) => void;
};

const Item = ({ item, handleClick, isSelected }: Props) => {
  return (
    <div
      className="item-wrapper"
      style={isSelected ? { background: "#eee" } : undefined}
    >
      <div className="item">
        <div className="left">
          <h2 className="title" onClick={() => handleClick(item)}>
            {item.title}
          </h2>
          <div className="item-details">
            <span className={`adjusted ${item.isSA ? "blue" : "red"}`} />
            {item.seasonalAdjustment} | {item.units}, {item.frequency}
          </div>
        </div>
        <div className="right">
          <p className="date">{item.last_updated}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
