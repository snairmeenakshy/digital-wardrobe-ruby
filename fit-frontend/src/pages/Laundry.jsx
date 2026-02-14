import { useState } from "react";
import { FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import "../styles/auth.css";

export default function Laundry() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Daily Wear",
      image:
        "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
      status: "Needs Wash",
      wearCount: 4,
    },
    {
      id: 2,
      name: "Office Outfit",
      image:
        "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
      status: "Clean",
      wearCount: 1,
    },
    {
      id: 3,
      name: "Weekend Clothes",
      image:
        "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
      status: "Needs Wash",
      wearCount: 5,
    },
  ]);

  const toggleStatus = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Clean"
                  ? "Needs Wash"
                  : "Clean",
              wearCount:
                item.status === "Needs Wash"
                  ? 0
                  : item.wearCount,
            }
          : item
      )
    );
  };

  const washAll = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        status: "Clean",
        wearCount: 0,
      }))
    );
  };

  const cleanCount = items.filter(item => item.status === "Clean").length;
  const dirtyCount = items.filter(item => item.status === "Needs Wash").length;
  const cleanItems = items.filter(item => item.status === "Clean");
  const dirtyItems = items.filter(item => item.status === "Needs Wash");

  return (
    <div className="laundry-page">
      {/* Header */}
      <div className="laundry-top-section">
        <div className="laundry-title-area">
          <h1 className="laundry-title">Laundry Management</h1>
          <p className="laundry-subtitle">Track and manage your clothing laundry status</p>
        </div>

        {/* Stats Cards */}
        <div className="laundry-stats">
          <div className="stat-card clean-stat">
            <FiCheck className="stat-icon" />
            <div>
              <p className="stat-label">Clean</p>
              <p className="stat-value">{cleanCount}</p>
            </div>
          </div>
          <div className="stat-card dirty-stat">
            <FiX className="stat-icon" />
            <div>
              <p className="stat-label">Needs Wash</p>
              <p className="stat-value">{dirtyCount}</p>
            </div>
          </div>
          <button className="wash-all-btn" onClick={washAll}>
            <FiArrowRight />
            Wash All
          </button>
        </div>
      </div>

      {/* Gallery */}
      {dirtyItems.length > 0 && (
        <div className="laundry-section">
          <h2 className="section-title">Needs Washing</h2>
          <div className="laundry-gallery-grid">
            {dirtyItems.map((item) => (
              <div
                key={item.id}
                className={`laundry-card dirty`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="status-badge">
                    <FiX /> Needs Wash
                  </div>
                </div>

                <div className="laundry-card-content">
                  <h3>{item.name}</h3>
                  <div className="wear-count">
                    <span>Worn</span>
                    <strong>{item.wearCount}x</strong>
                  </div>
                  <button
                    className="toggle-status-btn"
                    onClick={() => toggleStatus(item.id)}
                  >
                    Mark Clean
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cleanItems.length > 0 && (
        <div className="laundry-section">
          <h2 className="section-title">Clean & Ready</h2>
          <div className="laundry-gallery-grid">
            {cleanItems.map((item) => (
              <div
                key={item.id}
                className={`laundry-card clean`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="status-badge">
                    <FiCheck /> Clean
                  </div>
                </div>

                <div className="laundry-card-content">
                  <h3>{item.name}</h3>
                  <div className="wear-count">
                    <span>Worn</span>
                    <strong>{item.wearCount}x</strong>
                  </div>
                  <button
                    className="toggle-status-btn"
                    onClick={() => toggleStatus(item.id)}
                  >
                    Mark Needs Wash
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
