import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCandidate } from "../components/candidatesSlice";
import "../styling/AddCandidate.css";

const AddCandidate = () => {
  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    position: "",
    skills: [],
    profilePicture: null,
  });
  const [skills, setSkills] = useState([""]);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSkillChange = (index, value) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? value : skill
    );
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", candidateInfo.profilePicture);
    formData.append("key", process.env.REACT_APP_IMGBB_API_KEY);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      const imageUrl = data.data.url;

      dispatch(
        addCandidate({
          ...candidateInfo,
          skills: skills.filter((skill) => skill !== ""),
          imageUrl,
        })
      );

      // Reset form fields after submission
      setCandidateInfo({
        name: "",
        position: "",
        skills: [],
        profilePicture: null,
      });
      setSkills([""]);
      setMessage("Candidate successfully added!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to add candidate.");
    }
  };

  const handleFileChange = (event) => {
    setCandidateInfo({
      ...candidateInfo,
      profilePicture: event.target.files[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-candidate-form">
      {message && <div>{message}</div>} {/* Display the message */}
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidateInfo.name}
        onChange={(e) =>
          setCandidateInfo({ ...candidateInfo, name: e.target.value })
        }
        required
      />
      <select
        value={candidateInfo.position}
        onChange={(e) =>
          setCandidateInfo({ ...candidateInfo, position: e.target.value })
        }
        required
      >
        <option value="">Select Position</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Data Scientist">Data Scientist</option>
      </select>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            required
          />
          {skills.length > 1 && (
            <button type="button" onClick={() => removeSkill(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addSkill}>
        Add More Skill
      </button>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCandidate;
