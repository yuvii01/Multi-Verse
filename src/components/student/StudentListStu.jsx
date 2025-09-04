import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "https://your-backend-api.com/students";

const Container = styled.div`
  background: #f9f9f9;
  color: #333;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  min-height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #e3eaf2;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid #d0d7de;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
  color: #555;
`;

const Row = styled.tr`
  &:hover {
    background: #f1f5f9;
  }
`;

const Badge = styled.span`
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  background-color: ${(props) => (props.gender === "male" ? "#1976d2" : "#d81b60")};
  color: #fff;
  font-size: 0.75rem;
  text-transform: capitalize;
`;

const Status = styled.span`
  color: ${(props) => (props.complete ? "#2e7d32" : "#d32f2f")};
  font-weight: bold;
`;

const Icon = styled.span`
  margin-right: 0.3rem;
  vertical-align: middle;
  color: ${(props) => props.color || "#607d8b"};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  font-size: 1.1rem;
  cursor: pointer;

  svg:hover {
    opacity: 0.8;
  }
`;

const SearchBar = styled.input`
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  margin: 0 0 1rem;
  width: 300px;
  outline: none;

  &:focus {
    border-color: #1976d2;
  }
`;


export default function StudentListStu() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        // const response = await fetch(API_URL);
        // const data = await response.json();
        const data = dummyStudents;
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    }
    fetchStudents();
  }, []);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2 style={{ marginBottom: "1rem" }}>📋 Student Directory</h2>
      <SearchBar
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginBottom: "1rem", fontSize: "1rem" }}>
        Total Students: {filtered.length}
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Roll No</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Gender</Th>
            <Th>Mobile</Th>
            <Th>Department</Th>
            <Th>DOB</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student, idx) => (
            <Row key={idx}>
              <Td>{student.rollNo}</Td>
              <Td>
                <img
                  src={student.avatar}
                  alt={student.name}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
                {student.name}
              </Td>
              <Td>
                <Icon>
                  <FaEnvelope />
                </Icon>
                {student.email}
              </Td>
              <Td>
                <Badge gender={student.gender}>{student.gender}</Badge>
              </Td>
              <Td>
                <Icon color="#4caf50">
                  <FaPhone />
                </Icon>
                {student.mobile}
              </Td>
              <Td>{student.department}</Td>
              <Td>{student.dob}</Td>
              
              <Td>
                <Actions>
                  <FaEdit color="#1976d2" />
                  <FaTrash color="#ef5350" />
                </Actions>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// Dummy Data
const dummyStudents = [
  {
    rollNo: 1,
    name: "John Deo",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "mathematics",
    dob: "06/15/2005",
  },
  {
    rollNo: 2,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "test@email.com",
    phone : "9876543210",
    gender: "female",
    department: "civil",
    dob: "08/20/2005",
  },
  // Add more students as needed
];




