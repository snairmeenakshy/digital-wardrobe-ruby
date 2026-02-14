import { useState } from "react";
import { FiCheck, FiX, FiArrowRight, FiCopy } from "react-icons/fi";
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

  const [selectedItems, setSelectedItems] = useState([]);
  const [combinedName, setCombinedName] = useState("");

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

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      image: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
      status: "Needs Wash",
      wearCount: 0,
    };
    setItems([...items, newItem]);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const combineItems = () => {
    if (selectedItems.length < 2) {
      alert("Please select at least 2 items to combine.");
      return;
    }

    const selectedItemsList = items.filter((item) => selectedItems.includes(item.id));
    const totalWear = selectedItemsList.reduce((sum, item) => sum + item.wearCount, 0);
    const mainStatus = selectedItemsList[0].status;

    // If user didn't provide a name, auto-generate one from selected items
    const nameToUse = combinedName.trim()
      ? combinedName.trim()
      : selectedItemsList.map((i) => i.name).slice(0, 3).join(" + ");

    const newCombinedItem = {
      id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: nameToUse,
      image: selectedItemsList[0].image,
      status: mainStatus,
      wearCount: totalWear,
    };

    const filteredItems = items.filter((item) => !selectedItems.includes(item.id));
    setItems([...filteredItems, newCombinedItem]);
    setSelectedItems([]);
    setCombinedName("");
    // quick feedback
    alert(`Combined ${selectedItemsList.length} items into "${nameToUse}"`);
  };

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

      {/* Add Items & Combine Section */}
      <div className="laundry-add-section">
        <div className="add-items-prompt">
          <h2>Add Your Items</h2>
          <p>Start tracking your wardrobe! Add clothing items to manage their washing status and keep your clothes fresh.</p>
          <button className="add-item-btn" onClick={addItem}>
            <FiArrowRight /> Add Item
          </button>
        </div>

        <div className="combine-panel">
          <h3>Combine Items</h3>
          <p className="combine-sub">Select items from the lists and create a combined set.</p>
          <div className="combine-controls">
            <input
              className="combine-input"
              value={combinedName}
              onChange={(e) => setCombinedName(e.target.value)}
              placeholder="Combined name (e.g. 'Weekend Set')"
            />
            <div className="combine-actions">
              <button className="combine-btn" onClick={combineItems}>
                <FiCopy /> Combine ({selectedItems.length})
              </button>
              <button className="cancel-select-btn" onClick={() => setSelectedItems([])}>Cancel</button>
            </div>
          </div>
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
                className={`laundry-card dirty ${selectedItems.includes(item.id) ? 'selected-item' : ''}`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <button
                    className={`item-select-btn ${selectedItems.includes(item.id) ? 'active' : ''}`}
                    onClick={() => toggleSelectItem(item.id)}
                    aria-label="Select item"
                  >
                    {selectedItems.includes(item.id) ? '✓' : '+'}
                  </button>
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
                className={`laundry-card clean ${selectedItems.includes(item.id) ? 'selected-item' : ''}`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <button
                    className={`item-select-btn ${selectedItems.includes(item.id) ? 'active' : ''}`}
                    onClick={() => toggleSelectItem(item.id)}
                    aria-label="Select item"
                  >
                    {selectedItems.includes(item.id) ? '✓' : '+'}
                  </button>
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
