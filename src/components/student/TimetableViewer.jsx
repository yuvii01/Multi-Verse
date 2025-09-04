// src/components/student/TimetableViewer.jsx

import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  gap: 4px;
  margin-top: 1rem;
`;

const Cell = styled.div`
  padding: 0.75rem;
  background: ${({ header }) => (header ? "#4c8df1" : "#e3f2fd")};
  color: ${({ header }) => (header ? "white" : "black")};
  border-radius: 6px;
  font-weight: ${({ header }) => (header ? "bold" : "normal")};
  text-align: center;
`;

const timetable = [
  { period: "9:00 - 10:00", Mon: "Math", Tue: "English", Wed: "Science", Thu: "Math", Fri: "Computer" },
  { period: "10:00 - 11:00", Mon: "English", Tue: "Math", Wed: "Science", Thu: "Computer", Fri: "Math" },
  { period: "11:15 - 12:15", Mon: "Science", Tue: "Computer", Wed: "Math", Thu: "English", Fri: "Science" },
];

export default function TimetableViewer() {
  return (
    <div>
      <p>Weekly Timetable:</p>
      <Grid>
        <Cell header>Period</Cell>
        <Cell header>Mon</Cell>
        <Cell header>Tue</Cell>
        <Cell header>Wed</Cell>
        <Cell header>Thu</Cell>
        <Cell header>Fri</Cell>

        {timetable.map((row, idx) => (
          <React.Fragment key={idx}>
            <Cell>{row.period}</Cell>
            <Cell>{row.Mon}</Cell>
            <Cell>{row.Tue}</Cell>
            <Cell>{row.Wed}</Cell>
            <Cell>{row.Thu}</Cell>
            <Cell>{row.Fri}</Cell>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}
