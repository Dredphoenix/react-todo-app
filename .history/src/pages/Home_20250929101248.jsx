import React, { Component, useState ,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Home = () => {
 const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [search, setSearch] = useState("");

  // Handle Add / Edit
  const handleAdd = () => {

 

    const trimmed = input.trim();

    if (!trimmed) {
      alert("Please enter a valid input");
      return;
    }

    const isExist = items.find(
      (item) => item.toLowerCase() === trimmed.toLowerCase()
    );

    if (isExist && editIndex === -1) {
      alert("List item already exists");
      return;
    }

    if (editIndex === -1) {
      setItems([...items, trimmed]);
    } else {
      const updated = [...items];
      updated[editIndex] = trimmed;
      setItems(updated);
      setEditIndex(-1);
    }

    setInput("");
  };

  // Delete item
  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // Edit item
  const handleEdit = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  };

  // Search filter
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // Add using Enter key
  const handleEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  useEffect(() => {

    axios.get("http://localhost:5000/lists").then((response) => {

        console.log("Response >>>>>>>>>>", response.data.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          const serverItems = response.data.data.map((item) => item.action);
          setItems(serverItems);
        }
      })
      .catch((error) => {
        console.log("Error >>>>>>", error);
      });
  }, []);

 

   

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
          To-Do List
        </div>

        <div className="card-body p-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search your items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

      
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={editIndex === -1 ? "Add your favorite dish..." : "Edit item..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button
              className={`btn ${editIndex === -1 ? "btn-success" : "btn-primary"} fw-bold`}
              onClick={handleAdd}
            >
              {editIndex === -1 ? "Add " : "Update ✏️"}
            </button>
          </div>

         
          {filteredItems.length === 0 ? (
            <p className="text-center text-muted fst-italic">
              🥗 Nothing to show...
            </p>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredItems.map((item, index) => (
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
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(index)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(index)}
                    >
                      🗑️
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
