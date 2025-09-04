// src/components/student/ReportCardViewer.jsx

import React from "react";
import styled from "styled-components";
import jsPDF from "jspdf";

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

const Button = styled.button`
  margin-top: 1rem;
  background: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #1976d2;
  }
`;

const reportData = [
  { subject: "Mathematics", internal: 18, external: 70 },
  { subject: "English", internal: 20, external: 65 },
  { subject: "Science", internal: 17, external: 72 },
];

export default function ReportCardViewer({ user }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Report Card - ${user.username}`, 10, 10);
    reportData.forEach((item, i) => {
      doc.text(`${item.subject}: Internal ${item.internal}, External ${item.external}`, 10, 20 + i * 10);
    });
    doc.save(`${user.username}_report_card.pdf`);
  };

  return (
    <div>
      <p>Report Card for: <strong>{user.username}</strong></p>
      <Table>
        <thead>
          <tr>
            <Th>Subject</Th>
            <Th>Internal</Th>
            <Th>External</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, idx) => (
            <tr key={idx}>
              <Td>{item.subject}</Td>
              <Td>{item.internal}</Td>
              <Td>{item.external}</Td>
              <Td>{item.internal + item.external}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={downloadPDF}>Download PDF</Button>
    </div>
  );
}
