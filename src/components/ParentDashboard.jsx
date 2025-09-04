// src/components/ParentDashboard.jsx

import React, { useState } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 0.6rem;
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
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #1976d2;
  }
`;

export default function ParentDashboard({ user }) {
  // Dummy child data
  const child = {
    name: "Charlie Davis",
    grades: [
      { subject: "Math", grade: "A" },
      { subject: "Science", grade: "B+" },
    ],
    attendance: [
      { date: "2025-06-01", status: "Present" },
      { date: "2025-06-02", status: "Absent" },
    ],
    fees: [
      { term: "Term 1", status: "Paid" },
      { term: "Term 2", status: "Pending" },
    ],
  };
  
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [notices, setNotices] = useState([
    "PTA meeting on July 1, 2025",
    "Annual Sports Day on August 15, 2025",
    "Science Exhibition - September 10, 2025",
  ]);

  const handlePayment = (term) => {
    alert(`Redirecting to online payment for ${term}`);
  };

  const sendMessage = () => {
    if (!message) return;
    setChatHistory([{ from: "Parent", text: message }, ...chatHistory]);
    setMessage("");
  };

  const downloadNotification = () => {
    const doc = new jsPDF();
    doc.text("School Circulars", 10, 10);
    notices.forEach((notice, index) => {
      doc.text(`- ${notice}`, 10, 20 + index * 10);
    });
    doc.save("circulars.pdf");
  };

  return (
    <Container>
      {/* Grades Section */}
      <Section>
        <Title>Child's Grades</Title>
        <Table>
          <thead>
            <tr>
              <Th>Subject</Th>
              <Th>Grade</Th>
            </tr>
          </thead>
          <tbody>
            {child.grades.map((g, i) => (
              <tr key={i}>
                <Td>{g.subject}</Td>
                <Td>{g.grade}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Attendance Section */}
      <Section>
        <Title>Attendance Record</Title>
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {child.attendance.map((a, i) => (
              <tr key={i}>
                <Td>{a.date}</Td>
                <Td>{a.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Fees Section */}
      <Section>
        <Title>Fee Status</Title>
        <Table>
          <thead>
            <tr>
              <Th>Term</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {child.fees.map((f, i) => (
              <tr key={i}>
                <Td>{f.term}</Td>
                <Td>{f.status}</Td>
                <Td>
                  {f.status === "Pending" && (
                    <Button onClick={() => handlePayment(f.term)}>
                      Pay Online
                    </Button>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Notifications Section */}
      <Section>
        <Title>Notifications & Circulars</Title>
        <ul>
          {notices.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <Button onClick={downloadNotification}>
          Download Circulars (PDF)
        </Button>
      </Section>

      {/* Messaging Section */}
      <Section>
        <Title>Message Teachers</Title>
        <textarea
          rows={3}
          style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message to the teacher..."
        ></textarea>
        <Button onClick={sendMessage}>Send</Button>

        {/* Chat History */}
        {chatHistory.map((msg, i) => (
          <div key={i} style={{ marginTop: '0.5rem' }}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </Section>

      {/* Push Notification (Simulated) */}
      <Section>
        <Title>Push Notifications</Title>
        <p>You will receive real-time updates for new circulars, events, and urgent messages.</p>
      </Section>
    </Container>
  );
}
