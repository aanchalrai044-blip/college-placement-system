import { useEffect, useState } from "react";
import { getAll, addItem, deleteItem } from "../api.js";

function getStipendNumber(stipend) {
  if (!stipend) return null;
  const match = stipend.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export default function Internships() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    year: "FY",
    company: "",
    role: "",
    duration: "",
    stipend: "",
  });
  const [search, setSearch] = useState("");
  const [stipendFilter, setStipendFilter] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getAll("internships").then(setItems);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addItem("internships", form);
    setForm({ studentName: "", year: "FY", company: "", role: "", duration: "", stipend: "" });
    loadData();
  }

  async function handleDelete(id) {
    await deleteItem("internships", id);
    loadData();
  }

  const filteredItems = items.filter((item) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      item.company.toLowerCase().includes(searchLower) ||
      item.role.toLowerCase().includes(searchLower);

    const stipendNum = getStipendNumber(item.stipend);
    let matchesStipend = true;
    if (stipendFilter === "unpaid") matchesStipend = stipendNum === 0 || stipendNum === null;
    if (stipendFilter === "0-10000") matchesStipend = stipendNum > 0 && stipendNum < 10000;
    if (stipendFilter === "10000+") matchesStipend = stipendNum >= 10000;

    return matchesSearch && matchesStipend;
  });

  const uniqueCompanies = new Set(items.map((item) => item.company)).size;

  return (
    <div>
      <h1>Internship Records</h1>

      <div className="stats-grid">
        <div className="stat-box">
          <p className="stat-label">Total internships</p>
          <p className="stat-value">{items.length}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Companies</p>
          <p className="stat-value">{uniqueCompanies}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <input name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
        <select name="year" value={form.year} onChange={handleChange}>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
        </select>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
        <input name="duration" placeholder="Duration (e.g. 2 months)" value={form.duration} onChange={handleChange} />
        <input name="stipend" placeholder="Stipend" value={form.stipend} onChange={handleChange} />
        <button type="submit">Add Internship</button>
      </form>

      <div className="filter-bar">
        <input
          placeholder="Search by company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={stipendFilter} onChange={(e) => setStipendFilter(e.target.value)}>
          <option value="all">All Stipends</option>
          <option value="unpaid">Unpaid</option>
          <option value="0-10000">Below 10,000</option>
          <option value="10000+">10,000+</option>
        </select>
      </div>

      <div className="list">
        {filteredItems.map((item) => (
          <div key={item._id} className="card">
            <div>
              <p className="card-title">{item.studentName} ({item.year})</p>
              <p className="card-subtitle">{item.role} at {item.company}</p>
              {item.duration && <p className="card-subtitle">Duration: {item.duration}</p>}
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
            {item.stipend && <span className="badge">{item.stipend}</span>}
          </div>
        ))}
        {filteredItems.length === 0 && <p>No matching internship records.</p>}
      </div>
    </div>
  );
}