// src/components/student/StudentAttendanceView.jsx

import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 0.5rem;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
`;

const attendanceData = [
  { date: "2025-06-01", status: "Present" },
  { date: "2025-06-02", status: "Absent" },
  { date: "2025-06-03", status: "Late" },
  { date: "2025-06-04", status: "Present" },
  { date: "2025-06-05", status: "Present" },
];

export default function StudentAttendanceView({ user }) {
  return (
    <div>
      <p>Attendance for: <strong>{user.username}</strong></p>
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, idx) => (
            <tr key={idx}>
              <Td>{entry.date}</Td>
              <Td style={{ color: entry.status === "Absent" ? "red" : "green" }}>
                {entry.status}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
