// TierRow.jsx
import TierItem from "../TierItem/TierItem";
import "./TierRow.css";

const TierRow = ({ tier, items, onDropItem }) => {  //tier,items,onDropItemは親から渡された情報
  const handleDragOver = (e) => {
    e.preventDefault(); //dropを有効にする。
  };

  //ドロップされた時の通知
  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData("itemId");
    onDropItem(itemId, tier);
  };

  return (//onDragOver:マウスが上にある、onDrop:話された瞬間。
    <div className="tier-row" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="tier-label">{tier}</div>
      <div className="tier-items">
        {items.map((item) => (
          <TierItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TierRow;