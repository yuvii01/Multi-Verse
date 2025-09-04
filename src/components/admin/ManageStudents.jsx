import styled from "styled-components";
import {
  Avatar, CloseBtn, Container,
  Header, InfoSection, Input,
  ModalWrapper, Overlay, Select,
  SelectWrapper, UtilityContainer,
  Button, Table, Tbody, Td, Th, Thead, Tr
} from "../../styles/Styles.js";

import { useEffect, useState } from "react";
import useDebounce from '../../utils/Debounce.jsx';
import { allStudents } from "../../assets/Students.js";



const ManageStudents = () => {
  const [students, setStudents] = useState(allStudents);
  const [input, setInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("")
  const debouncedInput = useDebounce(input, 300);


  const searchStudent = (e) => {
    setInput(e.target.value);
  };

  // Class Filter
  const handleClassChange = (value) => {
    setSelectedClass(value);
  };
  
  const handleSectionChange = (value) => {
    setSelectedSection(value)
  }

  useEffect(() => {
    let filtered = allStudents;

    if (debouncedInput.trim() !== "") {
      filtered = filtered.filter((st) =>
        st.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
        (st.guardianName && st.guardianName.toLowerCase().includes(debouncedInput.toLowerCase()))
      );
    }

    if (selectedClass !== "") {
      filtered = filtered.filter((st) => st.class?.toString() === selectedClass.toString());
    }
    if (selectedSection !== "") {
      filtered = filtered.filter((st) => st.section?.toString() === selectedSection.toString())
    }

    setStudents(filtered);
  }, [debouncedInput, selectedClass, selectedSection]);

  return (
    <Container>
      {selectedStudent && (
        <Modal data={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by name or guardian name"
          value={input}
          onChange={searchStudent}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <SelectWrapper>
            <Select
              id="class-select"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="">All Classes</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <Select
              id="section-select"
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
            >
              <option value="">All Sections</option>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={String.fromCharCode(64 + (i + 1))}>
                  Sec {String.fromCharCode(64 + (i + 1))}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </div>
      </UtilityContainer>


      <Table>
        <Thead>
          <Tr>
            <Th>Profile</Th>
            <Th>RollNo</Th>
            <Th>Name</Th>
            <Th>Guradian Name</Th>
            <Th>Class</Th>
            <Th>Section</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.length > 0 ? (
            students.map((st, index) => (
              <Tr key={st.empId || index} onClick={() => setSelectedStudent(st)} style={{ cursor: "pointer" }}>
                <Td>
                  <Avatar sizes={'40px'} src={st.img} alt="profile_img" />
                </Td>
                <Td>{st.rollNumber}</Td>
                <Td>{st.name}</Td>
                <Td>{st.guardianName}</Td>
                <Td>{st.class}</Td>
                <Td>{st.section}</Td>
                <Td>{st.phone}</Td>

              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="6" style={{ textAlign: "center" }}>
                No staff found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ManageStudents;

const Modal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <Overlay>
      <ModalWrapper>
        <Header>
          <img src={data.img} alt={data.name} />
          <div>
            <h2>{data.name}</h2>
            <p>{data.designation}</p>
          </div>
        </Header>

        <InfoSection>
          <div><label>Student ID</label><p>{data.empId || "STU-" + Math.floor(1000 + Math.random() * 9000)}</p></div>
          <div><label>Class</label><p>{data.class || "N/A"} - {data.section}</p></div>
          <div><label>Date of Admission</label><p>{data.admissionDate || "N/A"}</p></div>
          <div><label>Contact</label><p>{data.phone || "N/A"}</p></div>
          <div><label>Email</label><p>{data.email || "N/A"}</p></div>
          <div><label>Address</label><p>{data.address || "N/A"}</p></div>
        </InfoSection>

        <CloseBtn onClick={onClose}>Close</CloseBtn>
      </ModalWrapper>
    </Overlay>
  );
};
