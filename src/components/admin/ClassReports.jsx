import { useState } from 'react';
import {
  Container,
  Input,
  Select,
  SelectWrapper,
  UtilityContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ChartContainer,
  ChartBox
} from '../../styles/Styles';
import useDebounce from '../../utils/Debounce.jsx';
import { useEffect } from 'react';
import ClassReprtPieChart from '../../utils/ClassReprtPieChart.jsx';
import ClassReportSubject from '../../utils/ClassReportSubject.jsx';
import ClassReportAverageNeddleChart from '../../utils/ClassReportAverageNeddleChart.jsx';
import styled from 'styled-components';
import { StudentReports } from '../../assets/Reports.js';

const ClassReports = () => {
  const [input, setInput] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState("")
  const [reports, setReports] = useState(StudentReports)
  const [studentData, setStudentData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const debouncedInput = useDebounce(input, 300);

  const searchStudent = (e) => {
    setInput(e.target.value);
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };
  const handleSectionChange = (value) => {
    setSelectedSection(value)
  }



  useEffect(() => {

    const filteredStudents = StudentReports.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(input.toLowerCase());
      const matchesClass = selectedClass === '' || student.class === selectedClass;
      const matchesSection = selectedSection === '' || student.section === selectedSection;
      return matchesName && matchesClass && matchesSection;
    });
    setReports(filteredStudents)
  }, [debouncedInput, selectedClass, selectedSection]);


  return (
    <Container>
      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by student name"
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        student={studentData}
      />

      {/* Table for Filtered Students */}
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Class</Th>
            <Th>Section</Th>
            <Th>Result %</Th>
            <Th>Overall Grade</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.length > 0 ? (
            reports.map((student, index) => (
              <Tr key={student.id || index} >
                <Td>{index + 1}</Td>
                <Td>{student.name}</Td>
                <Td>{student.class}</Td>
                <Td>{student.section}</Td>
                <Td>{student.result}%</Td>
                <Td>{student.grade}</Td>
                <Td>
                  <Button bg={"green"} onClick={() => {
                    setStudentData(reports[index])
                    setShowModal(true)
                  }}>View Report</Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="5" style={{ textAlign: 'center' }}>
                No data found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {selectedClass !== "" || selectedSection !== ""
        ? <div>
          <h1 style={{ textAlign: "center", fontWeight: "400" }}>Class {selectedClass}, Sec-{selectedSection}</h1>
          <ChartContainer>

            <ChartBox>
              <p>Class Result</p>
              <ClassReprtPieChart />
            </ChartBox>
            <ChartBox>
              <p>Subject Wise Result</p>
              <ClassReportSubject />
            </ChartBox>
            <ChartBox>
              <p>Class Average</p>
              <ClassReportAverageNeddleChart />
            </ChartBox>
          </ChartContainer>
        </div>

        :
        <h1 style={{ textAlign: "center", fontWeight: "400" }}>Please select any class to see class graph reports</h1>
      }
    </Container>
  );
};

export default ClassReports;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubjectList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const SubjectItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;


const Modal = ({ show, onClose, student }) => {
  if (!student) return null;
  return (
    <Overlay show={show} role="dialog" aria-modal="true" tabIndex="-1">
      <ModalBox>
        <Header>
          <div>
            <h2>{student.name}'s Report</h2>
            <p>Class: {student.class}, Sec: {student.section}</p>

          </div>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>

        <SubjectList>
          {student.subjects && student.subjects.map((subj, index) => (
            <SubjectItem key={index}>
              <span>{subj.name}</span>
              <span>{subj.marks} / 100</span>
            </SubjectItem>
          ))}
        </SubjectList>
      </ModalBox>
    </Overlay>
  );
}