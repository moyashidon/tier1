import React from "react";
import TierRow from "./TierRow";

const TierList = ({ data }) => {
  const tiers = ["S", "A", "B", "C"];

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <TierRow key={tier} tier={tier} items={data[tier]} />
      ))}

      {/* pool（未配置アイテム） */}
      <TierRow tier="pool" items={data.pool} />
    </div>
  );
};

export default TierList;