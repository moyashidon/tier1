import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data, onDropItem, onMove }) => {
  const tiers = ["S", "A", "B", "C"];

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow key={tier} tier={tier} items={data[tier]} onDropItem={onDropItem} onMove={onMove} />
      ))}

      {/* pool（未配置アイテム） */}
      <TierRow tier="pool" items={data.pool} onDropItem={onDropItem} onMove={onMove} />
    </div>
  );
};

export default TierList;