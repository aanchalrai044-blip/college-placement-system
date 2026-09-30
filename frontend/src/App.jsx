import { Routes, Route, Link } from "react-router-dom";
import Internships from "./pages/Internships.jsx";
import Placements from "./pages/Placements.jsx";
import Openings from "./pages/Openings.jsx";

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <h2>College Placement System</h2>
        <div className="nav-links">
          <Link to="/">Openings</Link>
          <Link to="/internships">Internships</Link>
          <Link to="/placements">Placements</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Openings />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </div>
    </div>
  );
}
