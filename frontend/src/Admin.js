import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notesMap, setNotesMap] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
  fetchData();
}, [fetchData]);

  // 🔹 Fetch Leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads", {
        headers: { Authorization: token },
      });

      setLeads(res.data.data);
    } catch (error) {
      console.log("Error fetching leads:", error);
    }
  };

  // 🔹 Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leads/${id}`,
        { status },
        { headers: { Authorization: token } }
      );

      fetchLeads();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  // 🔹 Update Notes
  const updateNotes = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leads/${id}`,
        { notes: notesMap[id] || "" },
        { headers: { Authorization: token } }
      );

      fetchLeads();
    } catch (error) {
      console.log("Error updating notes:", error);
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // 🔹 Search + Filter
  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) =>
      filter === "All" ? true : lead.status === filter
    );

  return (
    <div className="admin-container">
      <h1>Leads Dashboard</h1>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout 🚪
      </button>

      {/* Search + Filter */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by name or email"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>new</option>
          <option>contacted</option>
          <option>converted</option>
        </select>
      </div>

      {/* Cards */}
      <div className="cards">
        {filteredLeads.map((lead) => (
          <div key={lead._id} className="card">
            <p><b>Name:</b> {lead.name}</p>
            <p><b>Email:</b> {lead.email}</p>
            <p><b>Source:</b> {lead.source || "website"}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${lead.status}`}>
                {lead.status?.toUpperCase()}
              </span>
            </p>

            {/* Status Buttons */}
            <div className="btn-group">
              <button onClick={() => updateStatus(lead._id, "contacted")}>
                Contacted
              </button>

              <button onClick={() => updateStatus(lead._id, "converted")}>
                Converted
              </button>
            </div>

            {/* Notes */}
            <textarea
              placeholder="Add notes..."
              value={notesMap[lead._id] ?? lead.notes ?? ""}
              onChange={(e) =>
                setNotesMap({
                  ...notesMap,
                  [lead._id]: e.target.value,
                })
              }
            />

            <button
              className="save-btn"
              onClick={() => updateNotes(lead._id)}
            >
              Save Notes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;