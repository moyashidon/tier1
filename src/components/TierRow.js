// TierRow.jsx
import Item from "./Item";

const TierRow = ({ tier, items, onDropItem, onMove, isDragOver, onDragEnter, onDragLeave, label }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (onDragEnter) onDragEnter(tier);
  };

  const handleDragLeave = (e) => {
    // 関連ターゲットが現在の要素の内側にある場合は無視
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
      return;
    }
    if (onDragLeave) onDragLeave(tier);
  };

  //ドロップされた時の通知
  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData("itemId");
    onDropItem(itemId, tier);
    if (onDragLeave) onDragLeave(tier);
  };

  return (
    <div 
      className={`tier-row ${isDragOver ? 'drag-over' : ''}`} 
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`tier-label ${tier}`}>{label || tier}</div>
      <div className={`tier-items ${items.length === 0 ? 'empty' : ''}`}>
        {items.map((item) => (
          <Item key={item.id} item={item} fromTier={tier} onMove={onMove} />
        ))}
      </div>
    </div>
  );
};

export default TierRow;