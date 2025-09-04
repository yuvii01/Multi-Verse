import React, { useState } from "react";
import styled from "styled-components";

// Demo Data
const students = Array.from({ length: 20 }, (_, i) => ({
  rollNo: i + 1,
  name: `Student ${i + 1}`,
  admissionNo: `SPPS/${24 + (i % 2)}/${1000 + i}`,
}));

// Styled Components
const AttendanceContainer = styled.div`
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  width: 700px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  position: sticky;
  top: 1rem;
  background: white;
  z-index: 2;
`;

const ScrollContainer = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentCard = styled.div`
  background: #e7d3f4;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  width: 700px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
`;

const Info = styled.p`
  margin: 0.3rem 0;
  font-size: 0.95rem;
`;

const StatusOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  flex-wrap: wrap;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0.3rem 0;

  input {
    margin-right: 0.3rem;
  }
`;

const RemarkInput = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const markAttendance = (rollNo, status) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], status },
    }));
  };

  const handleRemark = (rollNo, remark) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], remark },
    }));
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AttendanceContainer>
      <h2>Mark Attendance</h2>
      <SearchBar
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ScrollContainer>
        {filteredStudents.map((student) => (
          <StudentCard key={student.rollNo}>
            <Info>
              <strong>Roll {student.rollNo}:</strong> {student.name}
            </Info>
            <Info>
              <strong>Admission No:</strong> {student.admissionNo}
            </Info>

            <StatusOptions>
              <OptionLabel>
                <input
                  type="radio"
                  name={`status-${student.rollNo}`}
                  checked={attendance[student.rollNo]?.status === "PRESENT"}
                  onChange={() => markAttendance(student.rollNo, "PRESENT")}
                />
                PRESENT
              </OptionLabel>
              <OptionLabel>
                <input
                  type="radio"
                  name={`status-${student.rollNo}`}
                  checked={attendance[student.rollNo]?.status === "LEAVE"}
                  onChange={() => markAttendance(student.rollNo, "LEAVE")}
                />
                LEAVE
              </OptionLabel>
              <OptionLabel>
                <input
                  type="radio"
                  name={`status-${student.rollNo}`}
                  checked={attendance[student.rollNo]?.status === "HALFDAY"}
                  onChange={() => markAttendance(student.rollNo, "HALFDAY")}
                />
                HALFDAY
              </OptionLabel>
              <OptionLabel>
                <input
                  type="radio"
                  name={`status-${student.rollNo}`}
                  checked={attendance[student.rollNo]?.status === "ABSENT"}
                  onChange={() => markAttendance(student.rollNo, "ABSENT")}
                />
                ABSENT
              </OptionLabel>
            </StatusOptions>

            <RemarkInput
              type="text"
              placeholder="Remark"
              value={attendance[student.rollNo]?.remark || ""}
              onChange={(e) => handleRemark(student.rollNo, e.target.value)}
            />
          </StudentCard>
        ))}

        {filteredStudents.length === 0 && <p>No students found.</p>}
      </ScrollContainer>
    </AttendanceContainer>
  );
}
