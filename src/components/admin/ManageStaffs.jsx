import styled from "styled-components";
import { Avatar, Button, Card, CloseBtn, Container, GridContainer, Header, InfoSection, Input, ModalWrapper, Overlay, UtilityContainer } from "../../styles/Styles.js"
import { useEffect, useState } from "react";
import Pagination from "../../ui/Pagination.jsx";
import useDebounce from '../../utils/Debounce.jsx';



const Name = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.4rem;
`;

const Subject = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
`;

import { allStaffs } from "../../assets/Staffs.js";

const ManageStaffs = () => {
  const [staffs, setStaffs] = useState(allStaffs);
  const [input, setInput] = useState("")
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const debouncedInput = useDebounce(input, 300);

  const totalPages = Math.ceil(staffs.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleStaffs = staffs.slice(startIndex, startIndex + itemsPerPage);

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





  const filterPeons = () => {
    const Peons = allStaffs.filter((st, idx) => (st.designation).toLowerCase() === "peon")
    setStaffs(Peons)
  }

  const filterTeachers = () => {
    const teachers = allStaffs.filter((st, idx) => (st.designation).toLowerCase() === "teacher")
    setStaffs(teachers)
  }

  const filterVicePrincipals = () => {
    const vicePrincipals = allStaffs.filter((st, idx) => (st.designation).toLowerCase() === "vice principal")
    setStaffs(vicePrincipals)
  }

  const filterDrivers = () => {
    const drivers = allStaffs.filter((st, idx) => (st.designation).toLowerCase() === "driver")
    setStaffs(drivers)
  }


  return (
    <Container>
      {selectedStaff && (
        <Modal data={selectedStaff} onClose={() => setSelectedStaff(null)} />
      )}
      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by name"
          value={input}
          onChange={searchStaff}

        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Button bg="#28a745" color="#fff" onClick={filterTeachers}>Teacher</Button>
          <Button bg="#ffc107" color="#000" onClick={filterVicePrincipals}>Vice Principals</Button>
          <Button bg="#007bff" color="#fff" onClick={filterPeons}>Peon</Button>
          <Button bg="#dc3545" color="#fff" onClick={filterDrivers}>Drivers</Button>
        </div>
      </UtilityContainer>

      <GridContainer>
        {visibleStaffs.map((st, idx) => (
          <Card key={idx} onClick={() => setSelectedStaff(st)}>
            <div >
              <Avatar src={st.img} alt="sandeep gupta" />
              <Name>{st.name}</Name>
              <Subject>{st.subject}</Subject>
            </div>
          </Card>
        ))}

      </GridContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}

export default ManageStaffs



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
          <div>
            <label>Subject</label>
            <p>{data.subject || "N/A"}</p>
          </div>
          <div>
            <label>Employee ID</label>
            <p>{data.empId || "STAFF-" + Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
          <div>
            <label>Qualification</label>
            <p>{data.qualification || "B.Ed / M.A."}</p>
          </div>
          <div>
            <label>Experience</label>
            <p>{data.experience || "5 years"}</p>
          </div>
          <div>
            <label>Date of Joining</label>
            <p>{data.joiningDate || "12-Jan-2020"}</p>
          </div>
          <div>
            <label>Contact</label>
            <p>{data.phone || "9876543210"}</p>
          </div>
          <div>
            <label>Email</label>
            <p>{data.email || "teacher@example.com"}</p>
          </div>
          <div>
            <label>Address</label>
            <p>{data.address || "Lucknow, UP"}</p>
          </div>
        </InfoSection>

        <CloseBtn onClick={onClose}>Close</CloseBtn>
      </ModalWrapper>
    </Overlay>
  );
};

