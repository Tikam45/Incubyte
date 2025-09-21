import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/apis"; // e.g. "http://localhost:5000/api"

export default function SweetForm() {
  const [form, setForm] = useState({
    id: "",         
    name: "",
    category: "Indian",
    price: "",
    quantity: ""
  });

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      category: "Indian",
      price: "",
      quantity: ""
    });
  };

  const addSweet = async () => {
    try {
      await axiosAuth.post("/sweets", {
        name: form.name,
        category: form.category,
        price: form.price,
        quantity: form.quantity
      });
      alert("Sweet added!");
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding sweet");
      console.error(err);
    }
  };

  const updateSweet = async () => {
    if (!form.id) return alert("Provide Sweet ID to update");
    try {
      await axiosAuth.put(`/sweets/${form.id}`, {
        name: form.name,
        category: form.category,
        price: form.price,
        quantity: form.quantity
      });
      alert("Sweet updated!");
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating sweet");
      console.error(err);
    }
  };

  const deleteSweet = async () => {
    if (!form.id) return alert("Provide Sweet ID to delete");
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axiosAuth.delete(`/sweets/${form.id}`);
      alert("Sweet deleted!");
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting sweet");
      console.error(err);
    }
  };

  return (
  <div
    style={{
      maxWidth: "28rem",
      margin: "0 auto",
      backgroundColor: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}
  >
    <h2
      style={{
        fontSize: "1.25rem",
        fontWeight: "bold",
        textAlign: "center"
      }}
    >
      Manage Sweet
    </h2>

    <input
      name="id"
      value={form.id}
      onChange={handleChange}
      placeholder="Sweet ID (for update/delete)"
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        width: "100%",
        borderRadius: "0.25rem"
      }}
    />

    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Name"
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        width: "100%",
        borderRadius: "0.25rem"
      }}
    />

    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        width: "100%",
        borderRadius: "0.25rem"
      }}
    >
      <option value="Indian">Indian</option>
      <option value="Foreign">Foreign</option>
    </select>

    <input
      type="number"
      name="price"
      value={form.price}
      onChange={handleChange}
      placeholder="Price"
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        width: "100%",
        borderRadius: "0.25rem"
      }}
    />

    <input
      type="number"
      name="quantity"
      value={form.quantity}
      onChange={handleChange}
      placeholder="Quantity"
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        width: "100%",
        borderRadius: "0.25rem"
      }}
    />

    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
      <button
        onClick={addSweet}
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer"
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#15803d")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
      >
        Add
      </button>

      <button
        onClick={updateSweet}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer"
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        Update
      </button>

      <button
        onClick={deleteSweet}
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer"
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
      >
        Delete
      </button>
    </div>
  </div>
);

}
