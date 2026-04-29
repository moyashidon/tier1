// TierRow.jsx
import { useState } from "react";
import Item from "./Item";
import "./TierRow.css";

const TierRow = ({ tier, items, onDropItem, onMove, onUpdateItem }) => {  //tier,items,onDropItemは親から渡された情報
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault(); //dropを有効にする。
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // 子要素へのドラッグを避ける
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };

  //ドロップされた時の通知
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData("itemId");
    onDropItem(itemId, tier);
  };

  return (//onDragOver:マウスが上にある、onDrop:話された瞬間。
    <div 
      className={`tier-row ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`tier-label ${tier}`}>{tier}</div>
      <div className="tier-items">
        {items.map((item) => (
          <Item key={item.id} item={item} fromTier={tier} onMove={onMove} onUpdateItem={onUpdateItem} />
        ))}
      </div>
    </div>
  );
};

export default TierRow;