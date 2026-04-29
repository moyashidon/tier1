import React, { useState } from "react";

function Item({ item, fromTier, onUpdateItemName, onDeleteItem }) {
  // item: { id, name, image など想定 }
  // fromTier: 今いるTier（S, A, B...）
  // onUpdateItemName: 親から渡されるアイテム名更新処理
  // onDeleteItem: 親から渡されるアイテム削除処理

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleNameClick = () => {
    setIsEditing(true);
    setEditName(item.name);
  };

  const handleNameSave = () => {
    if (editName.trim() && editName !== item.name) {
      onUpdateItemName(item.id, fromTier, editName);
    }
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setIsEditing(false);
    setEditName(item.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      handleNameCancel();
    }
  };

  return (
    <div className="item" draggable onDragStart={handleDragStart}>
      {/* 画像がある場合 */}
      {item.image && (
        <img src={item.image} alt={item.name} className="item-image" />
      )}

      {/* 名前 - 編集可能 */}
      {isEditing ? (
        <input
          type="text"
          className="item-name-input"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleNameSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p className="item-name" onClick={handleNameClick} title="クリックして名前を変更">
          {item.name}
        </p>
      )}

      {/* 削除ボタン */}
      <button
        className="item-delete-btn"
        onClick={() => onDeleteItem(item.id, fromTier)}
        title="アイテムを削除"
      >
        ✕
      </button>
    </div>
  );
}

export default Item;