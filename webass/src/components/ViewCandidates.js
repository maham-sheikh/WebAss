import "../styling/ViewCandidates.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ViewCandidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const candidates = useSelector((state) => state.candidates.candidates);
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (candidate.skills &&
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="view-candidates-container">
      <input
        type="text"
        className="search-box"
        placeholder="Search Candidates..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCandidates.map((candidate, index) => (
        <div key={index}>
          <h2>{candidate.name}</h2>
          <p>Applied for: {candidate.position}</p>
          <p>Skills: {candidate.skills.join(", ")}</p>
          <img
            src={candidate.imageUrl}
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ViewCandidates;
