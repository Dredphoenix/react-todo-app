import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([...items, input]);
      setInput("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #FFB74D, #FF7043)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="card shadow-lg" style={{ width: "420px", borderRadius: "20px" }}>
        <div
          className="card-header text-center text-white fw-bold"
          style={{
            backgroundColor: "#E64A19",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            fontSize: "1.5rem",
          }}
        >
          🍱 Food To-Do List
        </div>
        <div className="card-body p-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add your favorite dish..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button className="btn btn-success fw-bold" onClick={handleAdd}>
              Add 🍔
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-muted fst-italic">
              🥗 Nothing yet... Add something tasty!
            </p>
          ) : (
            <ul className="list-group list-group-flush">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "10px",
                    background: "#FFF8E1",
                    marginBottom: "8px",
                  }}
                >
                  <span className="fw-semibold">{item}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className="card-footer text-center text-muted"
          style={{
            fontSize: "0.9rem",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          Made with ❤️ for foodies
        </div>
      </div>
    </div>
  );
};

export default App;
