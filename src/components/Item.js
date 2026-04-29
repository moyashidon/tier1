import React, { useState } from "react";
import "./Item.css";

function Item({ item, fromTier, onMove, onUpdateItem }) {
  // item: { id, name, image など想定 }
  // fromTier: 今いるTier（S, A, B...）
  // onMove: 親から渡される移動処理
  // onUpdateItem: 親から渡されるアイテム編集処理

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editName.trim()) {
      onUpdateItem(item.id, fromTier, editName);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditName(item.name);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <div className="item" draggable onDragStart={handleDragStart}>
      {/* 画像がある場合 */}
      {item.image && (
        <img src={item.image} alt={item.name} className="item-image" />
      )}

      {/* 名前 */}
      {isEditing ? (
        <div className="item-edit">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSave}
            autoFocus
            className="item-edit-input"
          />
        </div>
      ) : (
        <p className="item-name" onClick={handleEditClick} title="クリックして編集">
          {item.name}
        </p>
      )}

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