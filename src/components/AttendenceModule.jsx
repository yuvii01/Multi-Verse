// src/components/AttendanceModule.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  padding: 1rem;
`;

const StudentRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  flex: 1;
`;

const Checkbox = styled.input`
  margin-left: 1rem;
`;

const DateSelector = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #388e3c;
  }
`;

const ExportButton = styled(Button)`
  background: #2196f3;
  margin-left: 1rem;
  &:hover {
    background: #1976d2;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
`;

const dummyStudents = [
  { id: 1, name: "Alice Smith" },
  { id: 2, name: "Bob Johnson" },
  { id: 3, name: "Charlie Davis" },
];

export default function AttendanceModule() {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    alert("Attendance saved!");
    // In a real app, send to backend here
  };

  const exportCSV = () => {
    const headers = ["Student", "Status", "Date"];
    const rows = dummyStudents.map((student) => [
      student.name,
      attendance[student.id] ? "Present" : "Absent",
      selectedDate,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <h3>Attendance Module</h3>

      <DateSelector
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {dummyStudents.map((student) => (
        <StudentRow key={student.id}>
          <Label>{student.name}</Label>
          <Checkbox
            type="checkbox"
            checked={attendance[student.id] || false}
            onChange={() => toggleAttendance(student.id)}
          />
        </StudentRow>
      ))}

      <Button onClick={handleSave}>Save Attendance</Button>
      <ExportButton onClick={exportCSV}>Export CSV</ExportButton>

      <Table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{attendance[student.id] ? "Present" : "Absent"}</td>
              <td>{selectedDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
