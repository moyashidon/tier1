import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data, onDropItem, onMove, onUpdate }) => {
  const tiers = ["X", "S+", "S", "A", "B", "C"];

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow key={tier} tier={tier} items={data[tier]} onDropItem={onDropItem} onMove={onMove} onUpdate={onUpdate} />
      ))}

      {/* ブキ（未配置アイテム） */}
      <TierRow tier="ブキ" items={data["ブキ"]} onDropItem={onDropItem} onMove={onMove} onUpdate={onUpdate} />
    </div>
  );
};

export default TierList;