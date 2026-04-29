import React, { useState, useRef } from 'react';
import './App.css';
import TierList from './components/TierList';

function App() {
  const [data, setData] = useState({
    S: [],
    A: [],
    B: [],
    C: [],
    G: [],
  });
  const nextIdRef = useRef(1);
  const [newItemName, setNewItemName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // 新しいアイテムを追加する処理
  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    setData(prevData => {
      const newData = { ...prevData };
      // 最初のティア（S）に追加
      newData.S.push({ id: nextIdRef.current, name: newItemName.trim(), image: imagePreview });
      nextIdRef.current += 1;
      return newData;
    });
    setNewItemName('');
    setImagePreview(null);
  };

  // アイテムを削除する処理
  const handleDeleteItem = (itemId, tier) => {
    setData(prevData => {
      const newData = { ...prevData };
      newData[tier] = newData[tier].filter(item => item.id !== itemId);
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  // アイテムをティア間で移動する処理
  const handleMoveItem = (itemId, fromTier, toTier) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      // 移動元から削除
      const itemIndex = newData[fromTier].findIndex(item => item.id === itemId);
      if (itemIndex === -1) return prevData;
      
      const [item] = newData[fromTier].splice(itemIndex, 1);
      
      // 移動先に追加
      newData[toTier].push(item);
      
      return newData;
    });
  };

  // ドロップされたアイテムを処理
  const handleDropItem = (itemId, toTier) => {
    // アイテムの現在の位置を見つけ、移動を実行
    Object.keys(data).forEach(tier => {
      if (data[tier].some(item => item.id === parseInt(itemId))) {
        handleMoveItem(parseInt(itemId), tier, toTier);
      }
    });
  };

  // アイテムの名前を更新する処理
  const handleUpdateItemName = (itemId, tier, newName) => {
    if (!newName.trim()) return;
    setData(prevData => {
      const newData = { ...prevData };
      const itemIndex = newData[tier].findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        newData[tier][itemIndex].name = newName.trim();
      }
      return newData;
    });
  };

  return (
    <div className="App">
      <h1>Tier List Maker</h1>
      <div className="add-item-section">
        <div className="add-item-form">
          <div className="add-item-inputs">
            <input
              type="text"
              className="add-item-input"
              placeholder="アイテムの名前を入力"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="file"
              accept="image/*"
              className="add-item-file"
              onChange={handleFileChange}
            />
          </div>
          {imagePreview && (
            <div className="add-item-preview-container">
              <img src={imagePreview} alt="preview" className="add-item-preview" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => setImagePreview(null)}
              >
                ✕
              </button>
            </div>
          )}
          <button className="add-item-button" onClick={handleAddItem}>
            + アイテムを追加
          </button>
        </div>
      </div>
      <TierList data={data} onDropItem={handleDropItem} onMove={handleMoveItem} onUpdateItemName={handleUpdateItemName} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;
