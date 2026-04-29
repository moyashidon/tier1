import React from "react";
import "./Item.css";

function Item({ item, fromTier, onMove }) {
  // item: { id, name, image など想定 }
  // fromTier: 今いるTier（S, A, B...）
  // onMove: 親から渡される移動処理

  const handleMove = (toTier) => {
    if (toTier === fromTier) return;
    onMove(item, fromTier, toTier);
  };

  return (
    <div className="item">
      {/* 画像がある場合 */}
      {item.image && (
        <img src={item.image} alt={item.name} className="item-image" />
      )}

      {/* 名前 */}
      <p className="item-name">{item.name}</p>

      {/* 移動ボタン（とりあえず） */}
      <div className="item-actions">
        {["S", "A", "B", "C", "pool"].map((tier) => (
          <button
            key={tier}
            onClick={() => handleMove(tier)}
            disabled={tier === fromTier}
          >
            {tier}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Item;