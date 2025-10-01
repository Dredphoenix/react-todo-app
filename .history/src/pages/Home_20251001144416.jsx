import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);  
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [search, setSearch] = useState("");

  // Fetch items from backend
  useEffect(() => {
    axios.get("http://localhost:5000/lists").then((response) => {
        if (response.data.success && Array.isArray(response.data.data)) {
          setItems(response.data.data);  
        }
      }).catch((err) => console.log(err));
  }, []);

  // Add and Update item
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      alert("Please enter a valid input");
      return;
    }

    if (editIndex === -1) {
      // Add new
      axios.post("http://localhost:5000/lists", { action: trimmed })
        .then((res) => {
          if (res.data && res.data.data) {
            setItems([...items, res.data.data]);
            setInput("");
          }
        })
        .catch((err) => console.log("Error adding item:", err));
    } else {
      // Update existing
      const itemToUpdate = items[editIndex];
      axios.put(`http://localhost:5000/lists/${itemToUpdate._id}`, { action: trimmed })
        .then((res) => {
          const updatedItems = [...items];
          updatedItems[editIndex] = res.data.data; 
          setItems(updatedItems);
          setEditIndex(-1);
          setInput("");
        })
        .catch((err) => console.log("Error updating item:", err));
    }
  };

  // Delete item
  const handleDelete = (index) => {
    const id = items[index]._id;
    axios.delete(`http://localhost:5000/lists/${id}`)
      .then((res) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        console.log("Deleted:", res.data);
      })
      .catch((err) => console.log("Error deleting item:", err));
  };

  // Edit item
  const handleEdit = (index) => {
    const item = items[index];
    setInput(item.action || "");
    setEditIndex(index);
  };

  // Search filter
  const filteredItems = items.filter(
    (item) => item.action && item.action.toLowerCase().includes(search.toLowerCase())
  );

  // Add using Enter key
  const handleEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #202021ff, #444444ff)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="card shadow-lg" style={{ width: "420px", borderRadius: "20px" }}>
        <div
          className="card-header text-center text-white fw-bold"
          style={{
            backgroundColor: "#23242a",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            fontSize: "1.5rem",
          }}
        >
          To-Do List
        </div>

        <div className="card-body p-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search your list..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={editIndex === -1 ? "Add your list..." : "Edit item..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button
              className={`btn ${editIndex === -1 ? "btn-success" : "btn-primary"} fw-bold`}
              onClick={handleAdd}
            >
              {editIndex === -1 ? "Add" : "Update"}
            </button>
          </div>

          {/* List */}
          {filteredItems.length === 0 ? (
            <p className="text-center text-muted fst-italic">Nothing to show...</p>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredItems.map((item, index) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "10px",
                    background: "#FFF8E1",
                    marginBottom: "8px",
                  }}
                >
                  <span className="fw-semibold">{item.action}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
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
          Make your day productive
        </div>
      </div>
    </div>
  );
};

export default Home;
