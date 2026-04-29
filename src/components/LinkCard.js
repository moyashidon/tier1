import React from "react";

function LinkCard({ link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
    >
      <div className="card-icon">{link.icon}</div>
      <h3 className="card-title">{link.title}</h3>
      <p className="card-category">{link.category}</p>
      <p className="card-description">{link.description}</p>
      <div className="card-footer">
        <span className="external-icon">↗</span>
      </div>
    </a>
  );
}

export default LinkCard;
