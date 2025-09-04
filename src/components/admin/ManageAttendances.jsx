
import styled from 'styled-components';
import { Avatar, Button, Container, Input, TabButton, Table, TabWrapper, Tbody, Td, Th, Thead, Tr, UtilityContainer } from '../../styles/Styles'
import { useEffect, useState } from 'react';
import { allStaffs } from '../../assets/Staffs.js';
import useDebounce from '../../utils/Debounce.jsx';
import { allStudents } from '../../assets/Students.js';
const AttendanceBox = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
`;

const Attendances = () => {
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <Container>

      <TabWrapper>
        <TabButton
          active={activeTab === "staff"}
          onClick={() => setActiveTab("staff")}
        >
          Staff Attendance
        </TabButton>
        <TabButton
          active={activeTab === "student"}
          onClick={() => setActiveTab("student")}
        >
          Student Attendance
        </TabButton>
      </TabWrapper>


      {activeTab === "staff" ? (
        <StaffAttendanceManagement />
      ) : (
        <StudentAttendanceManagement />
      )}

    </Container>
  );
}

export default Attendances



const StaffAttendanceManagement = () => {
  const [input, setInput] = useState("");
  const [staffs, setStaffs] = useState(allStaffs);
  const [openModal, setOpenModal] = useState(false);


  const debouncedInput = useDebounce(input, 300);
  useEffect(() => {
    const filtered = allStaffs.filter((st) =>
      st.name.toLowerCase().includes(debouncedInput.toLowerCase())
      ||
      st.subject.toLowerCase().includes(debouncedInput.toLowerCase())
    );
    setStaffs(filtered);
  }, [debouncedInput]);

  const searchStaff = (e) => {
    setInput(e.target.value);
  };


  const attendance = {
    "2025-07-01": "present",
    "2025-07-02": "absent",
    "2025-07-04": "present",
    "2025-07-08": "absent",
    "2025-07-12": "half",
    // ... aur bhi din
  };

  return (
    <>
      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by name"
          value={input}
          onChange={searchStaff}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Input type='date' />
        </div>
      </UtilityContainer>
      <AttendanceModal open={openModal} onClose={() => setOpenModal(false)} attendance={attendance} />

      <Table>
        <Thead>
          <Tr>
            <Th>Profile</Th>
            <Th>Name</Th>
            <Th>EmpID</Th>
            <Th>Designation</Th>
            <Th>Qualification</Th>
            <Th>Experience</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staffs.length > 0 ? (
            staffs.map((staff, index) => (
              <Tr key={staff.empId || index}>
                <Td>
                  <Avatar sizes={'40px'} src={staff.img} alt="profile_img" />
                </Td>
                <Td>{staff.name}</Td>
                <Td>{staff.empId}</Td>
                <Td>{staff.designation}</Td>
                <Td>{staff.qualification}</Td>
                <Td>{staff.experience} yrs</Td>
                <Td>

                  <Button bg="green" onClick={() => setOpenModal(true)}>
                    View Attendance
                  </Button>

                </Td>
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
    </>
  );
};



const StudentAttendanceManagement = () => {

  const [input, setInput] = useState("");
  const [students, setStudents] = useState(allStudents);
  const [openModal, setOpenModal] = useState(false);
  const debouncedInput = useDebounce(input, 300);
  useEffect(() => {
    const filtered = allStudents.filter((st) =>
      st.name.toLowerCase().includes(debouncedInput.toLowerCase())
      ||
      st.guardianName.toLowerCase().includes(debouncedInput.toLowerCase())
    );
    setStudents(filtered);
  }, [debouncedInput]);

  const searchStudent = (e) => {
    setInput(e.target.value);
  };



  const attendance = {
    "2025-07-01": "present",
    "2025-07-02": "absent",
    "2025-07-04": "present",
    "2025-07-08": "absent",
    "2025-07-09": "half",
    // ... aur bhi din
  };
  return (
    <>
      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by name"
          value={input}
          onChange={searchStudent}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Input type='date' />
        </div>
      </UtilityContainer>
      <AttendanceModal open={openModal} onClose={() => setOpenModal(false)} attendance={attendance} />
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
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.length > 0 ? (
            students.map((st, index) => (
              <Tr key={st.empId || index}>
                <Td>
                  <Avatar sizes={'40px'} src={st.img} alt="profile_img" />
                </Td>
                <Td>{st.rollNumber}</Td>
                <Td>{st.name}</Td>
                <Td>{st.guardianName}</Td>
                <Td>{st.class}</Td>
                <Td>{st.section}</Td>
                <Td>{st.phone}</Td>
                <Td>

                  <Button bg="green" onClick={() => setOpenModal(true)}>
                    View Attendance
                  </Button>

                </Td>
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
    </>
  )
}


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-top: 16px;
`;

const WeekHeader = styled.div`
  text-align: center;
  font-weight: bold;
`;

const DayCell = styled.div`
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  background-color: ${({ status }) =>
    status === "present" ? "#4CAF50" : status === "absent" ? "#F44336" : status === "half" ? "#ffd500" : "#f0f0f0"};
  color: ${({ status }) => (status ? "white" : "black")};
`;

const EmptyCell = styled.div``;

const CloseBtn = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const AttendanceModal = ({ open, onClose, attendance }) => {
  if (!open) return null;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getDayName = (year, month, date) => new Date(year, month, date).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getDayName(year, month, 1);

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<EmptyCell key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const status = attendance[dateKey] || null;

      days.push(
        <DayCell key={day} status={status}>
          {day}
        </DayCell>
      );
    }

    return days;
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseBtn onClick={onClose}>Close</CloseBtn>
        <h2 style={{ textAlign: "center" }}>Attendance Calendar - {today.toLocaleString("default", { month: "long" })}</h2>

        <CalendarGrid>
          <WeekHeader>Sun</WeekHeader>
          <WeekHeader>Mon</WeekHeader>
          <WeekHeader>Tue</WeekHeader>
          <WeekHeader>Wed</WeekHeader>
          <WeekHeader>Thu</WeekHeader>
          <WeekHeader>Fri</WeekHeader>
          <WeekHeader>Sat</WeekHeader>
          {renderDays()}
        </CalendarGrid>
      </ModalContainer>
    </Overlay>
  );
};

