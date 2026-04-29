import React, { useState } from "react";
import "./App.css";
import LinkCard from "./components/LinkCard";

function App() {
  const [links] = useState([
    {
      id: 1,
      title: "main",
      description: "mainのティア表",
      url: "https://tier1-git-main-moyashidons-projects.vercel.app/",
      category: "ウェブアプリ",
      icon: "🚀",
    },
    {
      id: 2,
      title: "もやし",
      description: "もやしのティア表",
      url: "https://tier1-git-momomoyasi-moyashidons-projects.vercel.app/",
      category: "ウェブアプリ",
      icon: "🛠️",
    },
    {
      id: 3,
      title: "白黒T",
      description: "もやしのティア表",
      url: "https://tier1-git-shirokurot1-moyashidons-projects.vercel.app/",
      category: "ウェブアプリ",
      icon: "📱",
    },
    {
      id: 3,
      title: "ロック",
      description: "ロックのティア表",
      url: "https://tier1-git-moyasipaisenkakkoii-moyashidons-projects.vercel.app/",
      category: "ウェブアプリ",
      icon: "📱",
    },
    {
      id: 3,
      title: "、、。",
      description: "、、。のティア表",
      url: "https://tier1-git-moyashi-is-disposable-moyashidons-projects.vercel.app/",
      category: "ウェブアプリ",
      icon: "📱",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const categories = ["すべて", ...new Set(links.map((link) => link.category))];

  const filteredLinks =
    selectedCategory === "すべて"
      ? links
      : links.filter((link) => link.category === selectedCategory);

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">デプロイ リンク集</h1>
        <p className="subtitle">すべてのプロジェクトへのアクセス</p>
      </header>

      <div className="filter-section">
        <h3>カテゴリー</h3>
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="links-grid">
        {filteredLinks.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}

export default App;
