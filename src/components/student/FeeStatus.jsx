// src/components/StudentDashboard.jsx

import React from "react";
import styled from "styled-components";
import jsPDF from "jspdf";

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;
  &:hover {
    background: #1976d2;
  }
`;



export default function FeeStatus({ user }) {




  const fees = [
    { term: "Term 1", amount: "₹10,000", paidOn: "2024-07-10", receiptId: "R001" },
    { term: "Term 2", amount: "₹10,000", paidOn: "2025-01-15", receiptId: "R002" },
  ];

  const attendance = [
    { date: "2025-06-01", status: "Present" },
    { date: "2025-06-02", status: "Absent" },
    { date: "2025-06-03", status: "Present" },
  ];

  const examResults = [
    { subject: "Math", marks: 92 },
    { subject: "English", marks: 88 },
    { subject: "Science", marks: 95 },
  ];

  const downloadReceipt = (receipt) => {
    const doc = new jsPDF();
    doc.text(`Receipt ID: ${receipt.receiptId}`, 10, 10);
    doc.text(`Student: ${user.username}`, 10, 20);
    doc.text(`Term: ${receipt.term}`, 10, 30);
    doc.text(`Amount Paid: ${receipt.amount}`, 10, 40);
    doc.text(`Date of Payment: ${receipt.paidOn}`, 10, 50);
    doc.save(`${receipt.receiptId}.pdf`);
  };

  return (
    <>


         {/* <Section>
        <h3>🎓 Admissions & Registration</h3>
        <AdmissionForm user={user} />
      </Section> */}

      <Section>
        <h3>Fee Structure & Payment History</h3>
        <Table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Amount</th>
              <th>Paid On</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.receiptId}>
                <td>{fee.term}</td>
                <td>{fee.amount}</td>
                <td>{fee.paidOn}</td>
                <td>
                  <Button onClick={() => downloadReceipt(fee)}>Download PDF</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

    </>
  );
}
