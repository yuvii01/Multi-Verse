import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/Styles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.75rem;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const dummyTeachers = [
  { id: 1, name: "Mr. Sharma" },
  { id: 2, name: "Ms. Gupta" },
  { id: 3, name: "Mrs. Verma" },
];

const dummySubjects = [
  "Math",
  "Science",
  "English",
  "Computer",
  "History",
  "Geography",
];

const AssignSubjects = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleAssign = () => {
    if (!selectedTeacher || selectedSubjects.length === 0) return;

    const teacherName = dummyTeachers.find(
      (t) => t.id === parseInt(selectedTeacher)
    )?.name;

    const newAssignment = {
      id: Date.now(),
      teacherId: selectedTeacher,
      teacherName,
      subjects: selectedSubjects,
    };

    setAssignments((prev) => {
      const existingIndex = prev.findIndex(
        (a) => a.teacherId === selectedTeacher
      );

      if (existingIndex !== -1) {
        // If teacher already exists, update the subjects
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          subjects: selectedSubjects,
        };
        return updated;
      } else {
        // Else, add new assignment
        return [...prev, newAssignment];
      }
    });

    setSelectedTeacher("");
    setSelectedSubjects([]);
  };


  const handleDelete = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Container>
      <Grid>
        {/* Left Section - Form */}
        <Section>
          <Heading>Assign Subjects to Teacher</Heading>

          <Label>Select Teacher</Label>
          <Select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">-- Choose a Teacher --</option>
            {dummyTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>

          <Label>Select Subjects</Label>
          <CheckboxGroup>
            {dummySubjects.map((subject) => (
              <CheckboxLabel key={subject}>
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                />
                {subject}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>

          <Button onClick={handleAssign}>Assign Subjects</Button>
        </Section>

        {/* Right Section - Assigned Table */}
        <Section>
          <Heading style={{ fontSize: "1.5rem" }}>Assigned Subjects</Heading>
          {assignments.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <Th>Teacher</Th>
                  <Th>Subjects</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <Td>{assignment.teacherName}</Td>
                    <Td>{assignment.subjects.join(", ")}</Td>
                    <Td>
                      <DeleteButton
                        onClick={() => handleDelete(assignment.id)}
                      >
                        Delete
                      </DeleteButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No subjects assigned yet.</p>
          )}
        </Section>
      </Grid>
    </Container>
  );
};

export default AssignSubjects;
