import React, { useState } from "react";
import styled from "styled-components";

const students = ["Alice", "Bob", "Charlie", "Diana"];

const GradeContainer = styled.div`
  padding: 1rem;
`;

const Input = styled.input`
  width: 60px;
  margin-left: 1rem;
  padding: 0.3rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function GradeSubmission() {
  const [grades, setGrades] = useState({});

  const handleChange = (name, value) => {
    setGrades((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Grades:", grades);
    alert("Grades submitted successfully!");
  };

  return (
    <GradeContainer>
      <h3>Submit Grades</h3>
      {students.map((s) => (
        <div key={s}>
          {s}
          <Input
            type="number"
            max={100}
            min={0}
            onChange={(e) => handleChange(s, e.target.value)}
          />
        </div>
      ))}
      <Button onClick={handleSubmit}>Submit Grades</Button>
    </GradeContainer>
  );
}
