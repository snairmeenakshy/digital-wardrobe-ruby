import { useState } from "react";
import { FiTrash2, FiRefreshCw, FiPlus } from "react-icons/fi";
import "../styles/auth.css";

export default function MyItems() {

  const [items, setItems] = useState([
    {
      id: 1,
      image: "https://i.pinimg.com/736x/71/5e/99/715e999de039d44aa66eafd952460aca.jpg",
      category: "Top",
      color: "Light",
      size: "M",
      owner: "Self",
      timesWorn: 2,
      lastWorn: "12/02/2026",
      lastWashed: "10/02/2026",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/61/04/f5/6104f5a32843ad883f59b40d75157c0e.jpg",
      category: "Bottom",
      color: "Dark",
      size: "M",
      owner: "Self",
      timesWorn: 1,
      lastWorn: "11/02/2026",
      lastWashed: "09/02/2026",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
      category: "Top",
      color: "Green",
      size: "L",
      owner: "Partner",
      timesWorn: 4,
      lastWorn: "13/02/2026",
      lastWashed: "05/02/2026",
    },
    {
      id: 4,
      image: "https://i.pinimg.com/1200x/94/5b/05/945b053faf046ec6eaa52c62e3e130e3.jpg",
      category: "Formal",
      color: "Neutral",
      size: "M",
      owner: "Self",
      timesWorn: 3,
      lastWorn: "08/02/2026",
      lastWashed: "06/02/2026",
    },
    {
      id: 5,
      image: "https://i.pinimg.com/1200x/a3/14/1d/a3141d88b2d850feb59a7c277740c4ac.jpg",
      category: "Kids",
      color: "Bright",
      size: "S",
      owner: "Child",
      timesWorn: 2,
      lastWorn: "07/02/2026",
      lastWashed: "04/02/2026",
    },
  ]);

  const handleWear = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              timesWorn: item.timesWorn + 1,
              lastWorn: new Date().toLocaleDateString("en-GB"),
            }
          : item
      )
    );
  };

  const handleWash = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              timesWorn: 0,
              lastWashed: new Date().toLocaleDateString("en-GB"),
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = () => {
    setItems((prev) => {
      const maxId = prev.length ? Math.max(...prev.map((i) => i.id)) : 0;
      const newItem = {
        id: maxId + 1,
        image: "https://i.pinimg.com/736x/71/5e/99/715e999de039d44aa66eafd952460aca.jpg",
        category: "New",
        color: "Neutral",
        size: "M",
        owner: "Self",
        timesWorn: 0,
        lastWorn: "-",
        lastWashed: "-",
      };
      return [newItem, ...prev];
    });
  };

  const totalItems = items.length;
  const totalWorn = items.reduce((s, it) => s + it.timesWorn, 0);
  const topItems = items.filter((it) => it.category === "Top");
  const bottomItems = items.filter((it) => it.category === "Bottom");
  const formalItems = items.filter((it) => it.category === "Formal");
  const kidsItems = items.filter((it) => it.category === "Kids");

  return (
    <div className="laundry-page">
      <div className="laundry-top-section">
        <div className="laundry-title-area">
          <h1 className="laundry-title">My Items</h1>
          <p className="laundry-subtitle">Manage and track your wardrobe</p>
        </div>

        <div className="laundry-stats">
          <div className="stat-card">
            <div>
              <p className="stat-label">Total Items</p>
              <p className="stat-value">{totalItems}</p>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p className="stat-label">Times Worn</p>
              <p className="stat-value">{totalWorn}</p>
            </div>
          </div>
          <button className="wash-all-btn" onClick={addItem}>
            <FiPlus /> Add Item
          </button>
        </div>
      </div>

      {topItems.length > 0 && (
      <div className="laundry-section">
        <h2 className="section-title">Tops</h2>
        <div className="laundry-gallery-grid">
          {topItems.map((item) => (
            <div key={item.id} className={`laundry-card ${item.timesWorn > 0 ? 'dirty' : 'clean'}`}>
              <div className="laundry-image-wrapper">
                <img src={item.image} alt={item.category} />
                <div className="status-badge">{item.owner}</div>
              </div>

              <div className="laundry-card-content">
                <h3>{item.category}</h3>
                <div className="wear-count">
                  <span>{item.color} • {item.size}</span>
                  <strong>{item.timesWorn}x</strong>
                </div>
                <p style={{marginTop:8, marginBottom:8}}><small>Last worn: {item.lastWorn}</small></p>
                <p style={{marginTop:0, marginBottom:12}}><small>Last washed: {item.lastWashed}</small></p>

                <div style={{display:'flex',gap:8}}>
                  <button className="toggle-status-btn" onClick={() => handleWear(item.id)}>
                    Wear
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleWash(item.id)}>
                    <FiRefreshCw /> Wash
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleDelete(item.id)}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {bottomItems.length > 0 && (
      <div className="laundry-section">
        <h2 className="section-title">Bottoms</h2>
        <div className="laundry-gallery-grid">
          {bottomItems.map((item) => (
            <div key={item.id} className={`laundry-card ${item.timesWorn > 0 ? 'dirty' : 'clean'}`}>
              <div className="laundry-image-wrapper">
                <img src={item.image} alt={item.category} />
                <div className="status-badge">{item.owner}</div>
              </div>

              <div className="laundry-card-content">
                <h3>{item.category}</h3>
                <div className="wear-count">
                  <span>{item.color} • {item.size}</span>
                  <strong>{item.timesWorn}x</strong>
                </div>
                <p style={{marginTop:8, marginBottom:8}}><small>Last worn: {item.lastWorn}</small></p>
                <p style={{marginTop:0, marginBottom:12}}><small>Last washed: {item.lastWashed}</small></p>

                <div style={{display:'flex',gap:8}}>
                  <button className="toggle-status-btn" onClick={() => handleWear(item.id)}>
                    Wear
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleWash(item.id)}>
                    <FiRefreshCw /> Wash
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleDelete(item.id)}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {formalItems.length > 0 && (
      <div className="laundry-section">
        <h2 className="section-title">Formal</h2>
        <div className="laundry-gallery-grid">
          {formalItems.map((item) => (
            <div key={item.id} className={`laundry-card ${item.timesWorn > 0 ? 'dirty' : 'clean'}`}>
              <div className="laundry-image-wrapper">
                <img src={item.image} alt={item.category} />
                <div className="status-badge">{item.owner}</div>
              </div>

              <div className="laundry-card-content">
                <h3>{item.category}</h3>
                <div className="wear-count">
                  <span>{item.color} • {item.size}</span>
                  <strong>{item.timesWorn}x</strong>
                </div>
                <p style={{marginTop:8, marginBottom:8}}><small>Last worn: {item.lastWorn}</small></p>
                <p style={{marginTop:0, marginBottom:12}}><small>Last washed: {item.lastWashed}</small></p>

                <div style={{display:'flex',gap:8}}>
                  <button className="toggle-status-btn" onClick={() => handleWear(item.id)}>
                    Wear
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleWash(item.id)}>
                    <FiRefreshCw /> Wash
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleDelete(item.id)}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {kidsItems.length > 0 && (
      <div className="laundry-section">
        <h2 className="section-title">Kids</h2>
        <div className="laundry-gallery-grid">
          {kidsItems.map((item) => (
            <div key={item.id} className={`laundry-card ${item.timesWorn > 0 ? 'dirty' : 'clean'}`}>
              <div className="laundry-image-wrapper">
                <img src={item.image} alt={item.category} />
                <div className="status-badge">{item.owner}</div>
              </div>

              <div className="laundry-card-content">
                <h3>{item.category}</h3>
                <div className="wear-count">
                  <span>{item.color} • {item.size}</span>
                  <strong>{item.timesWorn}x</strong>
                </div>
                <p style={{marginTop:8, marginBottom:8}}><small>Last worn: {item.lastWorn}</small></p>
                <p style={{marginTop:0, marginBottom:12}}><small>Last washed: {item.lastWashed}</small></p>

                <div style={{display:'flex',gap:8}}>
                  <button className="toggle-status-btn" onClick={() => handleWear(item.id)}>
                    Wear
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleWash(item.id)}>
                    <FiRefreshCw /> Wash
                  </button>
                  <button className="toggle-status-btn" onClick={() => handleDelete(item.id)}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
