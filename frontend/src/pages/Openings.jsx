import { useEffect, useState } from "react";
import { getAll, addItem, deleteItem } from "../api.js";
import "../ui.css";

const EMPTY_FORM = {
  companyName: "",
  role: "",
  eligibility: "",
  description: "",
  deadline: "",
};

// Turns the saved deadline (YYYY-MM-DD) into a display date and a status badge.
function getDeadlineInfo(value) {
  if (!value) return { label: "No deadline", tone: null };

  const date = new Date(`${value}T23:59:59`);
  if (Number.isNaN(date.getTime())) return { label: value, tone: null };

  const label = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const daysLeft = Math.floor((date - Date.now()) / 86400000);

  if (daysLeft < 0) return { label, tone: "closed", status: "Closed" };
  if (daysLeft <= 7) {
    return {
      label,
      tone: "soon",
      status: daysLeft === 0 ? "Closes today" : `${daysLeft}d left`,
    };
  }
  return { label, tone: "open", status: "Open" };
}

export default function Openings() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setItems(await getAll("openings"));
      setError("");
    } catch {
      setError("Couldn't load openings. Check that the backend is running, then refresh.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await addItem("openings", form);
      setForm(EMPTY_FORM);
      await loadData();
    } catch {
      setError("Couldn't add the opening. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete the ${item.role} opening at ${item.companyName}?`)) return;
    try {
      await deleteItem("openings", item._id);
      await loadData();
    } catch {
      setError("Couldn't delete the opening. Try again.");
    }
  }

  const query = search.trim().toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      !query ||
      (item.companyName || "").toLowerCase().includes(query) ||
      (item.role || "").toLowerCase().includes(query)
  );

  const uniqueCompanies = new Set(items.map((item) => item.companyName)).size;
  const closingSoon = items.filter((item) => getDeadlineInfo(item.deadline).tone === "soon").length;

  return (
    <div className="op-page">
      <h1>Company openings</h1>
      <p className="op-intro">Track which companies are hiring, who is eligible, and when applications close.</p>

      {error && (
        <p className="op-error" role="alert">
          {error}
        </p>
      )}

      <dl className="op-summary">
        <div>
          <dt>Total openings</dt>
          <dd>{items.length}</dd>
        </div>
        <div>
          <dt>Companies</dt>
          <dd>{uniqueCompanies}</dd>
        </div>
        <div>
          <dt>Closing within 7 days</dt>
          <dd>{closingSoon}</dd>
        </div>
      </dl>

      <section className="op-panel">
        <h2>Add an opening</h2>
        <form onSubmit={handleSubmit} className="op-form-grid">
          <div className="op-field">
            <label htmlFor="companyName">Company name</label>
            <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required />
          </div>
          <div className="op-field">
            <label htmlFor="role">Role</label>
            <input id="role" name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div className="op-field">
            <label htmlFor="eligibility">
              Eligibility <span className="op-hint">(e.g. TY, 60%+)</span>
            </label>
            <input id="eligibility" name="eligibility" value={form.eligibility} onChange={handleChange} />
          </div>
          <div className="op-field">
            <label htmlFor="deadline">Application deadline</label>
            <input id="deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} />
          </div>
          <div className="op-field op-field--wide">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="op-form-actions">
            <button type="submit" className="op-btn op-btn--primary" disabled={saving}>
              {saving ? "Adding..." : "Add opening"}
            </button>
          </div>
        </form>
      </section>

      <div className="op-toolbar">
        <h2>All openings</h2>
        <input
          className="op-search"
          type="search"
          aria-label="Search openings"
          placeholder="Search by company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="op-table-wrap">
        {loading ? (
          <p className="op-empty">Loading openings...</p>
        ) : filteredItems.length === 0 ? (
          <p className="op-empty">
            <strong>{items.length === 0 ? "No openings yet" : "No matching openings"}</strong>
            {items.length === 0
              ? "Add the first one using the form above."
              : "Try a different company or role."}
          </p>
        ) : (
          <table className="op-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Eligibility</th>
                <th>Deadline</th>
                <th>
                  <span className="op-sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const deadline = getDeadlineInfo(item.deadline);
                return (
                  <tr key={item._id}>
                    <td className="op-company">{item.companyName}</td>
                    <td>
                      {item.role}
                      {item.description && <p className="op-desc">{item.description}</p>}
                    </td>
                    <td>{item.eligibility || "Not specified"}</td>
                    <td>
                      {deadline.label}
                      {deadline.tone && (
                        <div>
                          <span className={`op-badge op-badge--${deadline.tone}`}>{deadline.status}</span>
                        </div>
                      )}
                    </td>
                    <td className="op-actions">
                      <button type="button" className="op-btn op-btn--ghost" onClick={() => handleDelete(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
