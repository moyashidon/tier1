import React, { useState } from 'react';
import './App.css';
import TierList from './components/TierList';

function App() {
  const [data, setData] = useState({
    S: [],
    A: [],
    B: [],
    C: [],
    pool: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' },
    ]
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

  return (
    <div className="App">
      <h1>Tier List Maker</h1>
      <TierList data={data} onDropItem={handleDropItem} onMove={handleMoveItem} />
    </div>
  );
}

export default App;
