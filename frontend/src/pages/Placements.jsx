import { useEffect, useState } from "react";
import { getAll, addItem, deleteItem } from "../api.js";

export default function Placements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ studentName: "", company: "", role: "", package: "" });

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getAll("placements").then(setItems);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addItem("placements", form);
    setForm({ studentName: "", company: "", role: "", package: "" });
    loadData();
  }

  async function handleDelete(id) {
    await deleteItem("placements", id);
    loadData();
  }

  return (
    <div>
      <h1>Placement Records (TY)</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <input name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
        <input name="package" placeholder="Package (e.g. 6 LPA)" value={form.package} onChange={handleChange} />
        <button type="submit">Add Placement</button>
      </form>

      <div className="list">
        {items.map((item) => (
          <div key={item._id} className="card">
            <strong>{item.studentName}</strong> — {item.role} at {item.company}
            {item.package && <span> | Package: {item.package}</span>}
            <br />
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
        {items.length === 0 && <p>No placement records yet.</p>}
      </div>
    </div>
  );
}
