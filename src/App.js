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

  const [dragOverTier, setDragOverTier] = useState(null);

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
    setData(prevData => {
      let fromTier = null;
      let item = null;
      
      // アイテムの現在の位置を見つける
      Object.keys(prevData).forEach(tier => {
        const found = prevData[tier].find(i => i.id === parseInt(itemId));
        if (found) {
          fromTier = tier;
          item = found;
        }
      });
      
      if (!fromTier || !item) return prevData;
      if (fromTier === toTier) return prevData;
      
      const newData = {};
      Object.keys(prevData).forEach(tier => {
        newData[tier] = [...prevData[tier]];
      });
      
      // 移動元から削除
      newData[fromTier] = newData[fromTier].filter(i => i.id !== parseInt(itemId));
      
      // ID順に挿入
      const insertIndex = newData[toTier].findIndex(i => i.id > item.id);
      if (insertIndex === -1) {
        newData[toTier].push(item);
      } else {
        newData[toTier].splice(insertIndex, 0, item);
      }
      
      return newData;
    });
  };

  return (
    <div className="App">
      <h1>Tier List Maker</h1>
      <TierList 
        data={data} 
        onDropItem={handleDropItem} 
        onMove={handleMoveItem}
        dragOverTier={dragOverTier}
        onDragEnter={(tier) => setDragOverTier(tier)}
        onDragLeave={() => setDragOverTier(null)}
      />
    </div>
  );
}

export default App;
