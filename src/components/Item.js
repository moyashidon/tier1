import React, { useState } from "react";

function Item({ item, fromTier, onMove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleMove = (toTier) => {
    if (toTier === fromTier) return;
    onMove(item.id, fromTier, toTier);
  };

  // 名前の保存
  const handleNameSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="item" draggable onDragStart={handleDragStart}>
      {/* 名前（編集可能） */}
      {isEditing ? (
        <div className="item-name-edit">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSave}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
            autoFocus
          />
        </div>
      ) : (
        <p className="item-name" onDoubleClick={() => setIsEditing(true)}>
          {item.name}
        </p>
      )}

      {/* 移動ボタン */}
      <div className="item-actions">
        {["X", "S+", "S", "A", "B", "C", "ブキ"].map((tier) => (
          <button
            key={tier}
            onClick={() => handleMove(tier)}
            disabled={tier === fromTier}
            className={tier === fromTier ? 'active' : ''}
          >
            {tier}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Item;