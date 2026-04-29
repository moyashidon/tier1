import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data, onDropItem, onMove, onUpdateItem }) => {
  const tiers = ["S", "A", "B", "C"];

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow key={tier} tier={tier} items={data[tier]} onDropItem={onDropItem} onMove={onMove} onUpdateItem={onUpdateItem} />
      ))}

      {/* pool（未配置アイテム） */}
      <TierRow tier="pool" items={data.pool} onDropItem={onDropItem} onMove={onMove} onUpdateItem={onUpdateItem} />
    </div>
  );
};

export default TierList;