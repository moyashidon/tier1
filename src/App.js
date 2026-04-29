import React, { useState } from 'react';
import './App.css';
import TierList from './components/TierList';

function App() {
  const [data, setData] = useState({
    X: [],
    'S+': [],
    S: [],
    A: [],
    B: [],
    C: [],
    ブキ: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }))
  });

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

  // アイテム情報の更新
  const handleUpdateItem = (itemId, updates) => {
    setData(prevData => {
      const newData = { ...prevData };
      // 全てのTierを検索して更新
      Object.keys(newData).forEach(tier => {
        const itemIndex = newData[tier].findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          newData[tier][itemIndex] = { ...newData[tier][itemIndex], ...updates };
        }
      });
      return newData;
    });
  };

  return (
    <div className="App">
      <h1>
        <span className="title-splatoon">Splatoon</span>
        <span className="title-number">3</span>
        <span className="title-sub">ブキTier表</span>
      </h1>
      <TierList data={data} onDropItem={handleDropItem} onMove={handleMoveItem} onUpdate={handleUpdateItem} />
    </div>
  );
}

export default App;
