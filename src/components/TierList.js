import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data, onDropItem, onMove, dragOverTier, onDragEnter, onDragLeave }) => {
  const tiers = ["S", "A", "B", "C"];

  const getLabel = (tier) => {
    const labels = { S: "神", A: "エイサー", B: "普通", C: "うぉっww" };
    return labels[tier] || tier;
  };

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow 
          key={tier} 
          tier={tier}
          label={getLabel(tier)}
          items={data[tier]} 
          onDropItem={onDropItem} 
          onMove={onMove}
          isDragOver={dragOverTier === tier}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        />
      ))}

      {/* ぶっち!!! */}
      <TierRow 
        tier="pool"
        label="ぶっち!!!" 
        items={data.pool} 
        onDropItem={onDropItem} 
        onMove={onMove}
        isDragOver={dragOverTier === "pool"}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      />
    </div>
  );
};

export default TierList;