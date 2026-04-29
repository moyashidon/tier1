import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data, onDropItem, onMove, onUpdateItemName, onDeleteItem }) => {
  const tiers = ["S", "A", "B", "C", "G"];

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow key={tier} tier={tier} items={data[tier]} onDropItem={onDropItem} onMove={onMove} onUpdateItemName={onUpdateItemName} onDeleteItem={onDeleteItem} />
      ))}
    </div>
  );
};

export default TierList;