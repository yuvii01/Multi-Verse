import  { useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/Styles.js";
import { dummyHostelComplaints } from "../../assets/HostelComplaints.js";
const Wrapper = styled.div`
  padding: 1.5rem;
  max-width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    min-width: unset;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 0;
    box-shadow: none;
  }
`;


const Th = styled.th`
  background: #1976d2;
  color: #fff;
  padding: 1rem;
  font-size: 0.95rem;
  text-align: left;

  @media (max-width: 600px) {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
`;

const Td = styled.td`
  border: 1px solid #e0e0e0;
  padding: 1rem;
  font-size: 0.95rem;
  color: #333;

  @media (max-width: 600px) {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  margin-right: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  width: 200px;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  background: #388e3c;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2e7d32;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ComplaintsWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: auto;
  height:60vh;
  overflow-y:auto;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #222;
  }

  .complaint-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .complaint-card {
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid #ff5e5e;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: #333;
    gap: 0.5rem;
  }

  .matter {
    font-size: 1rem;
    color: #444;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
  }

  .timestamp {
    font-size: 0.85rem;
    color: #888;
    text-align: right;
  }

  .no-data {
    text-align: center;
    color: #777;
    font-style: italic;
  }

  /* ---------- Responsive styles ---------- */
  @media (max-width: 768px) {
    padding: 1rem;

    h3 {
      font-size: 1.25rem;
    }

    .complaint-card {
      padding: 0.85rem;
    }

    .top {
      font-size: 0.9rem;
    }

    .matter {
      font-size: 0.95rem;
    }

    .timestamp {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem;

    h3 {
      font-size: 1.1rem;
    }

    .top {
      flex-direction: column;
      align-items: flex-start;
    }

    .complaint-card {
      padding: 0.75rem;
    }

    .matter {
      font-size: 0.9rem;
    }

    .timestamp {
      text-align: left;
      font-size: 0.75rem;
    }
  }
`;



export default function HostelManagement() {
  const [rooms, setRooms] = useState([
    { roomNo: "101", occupant: "Ravi", fee: 5000 },
    { roomNo: "102", occupant: "Empty", fee: 5000 },
    { roomNo: "103", occupant: "Aisha", fee: 5000 },
  ]);
  const [newRoom, setNewRoom] = useState({ roomNo: "", occupant: "", fee: "" });
  const [hostelComplaints, setHostelComplaints] = useState(dummyHostelComplaints)
  const handleAddRoom = () => {
    if (!newRoom.roomNo || !newRoom.fee) return alert("Room number and fee are required.");
    setRooms([...rooms, { ...newRoom }]);
    setNewRoom({ roomNo: "", occupant: "", fee: "" });
  };

  return (
    <Container>

      <Wrapper>
        <h3>Hostel / Dorm Management</h3>

        <div>
          <Input
            type="text"
            placeholder="Room No"
            value={newRoom.roomNo}
            onChange={(e) => setNewRoom({ ...newRoom, roomNo: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Occupant Name"
            value={newRoom.occupant}
            onChange={(e) => setNewRoom({ ...newRoom, occupant: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Fee"
            value={newRoom.fee}
            onChange={(e) => setNewRoom({ ...newRoom, fee: e.target.value })}
          />
          <Button onClick={handleAddRoom}>Add Room</Button>
        </div>

        <Table>
          <thead>
            <tr>
              <Th>Room No</Th>
              <Th>Occupant</Th>
              <Th>Fee</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index}>
                <Td>{room.roomNo}</Td>
                <Td>{room.occupant}</Td>
                <Td>₹{room.fee}</Td>
                <Td>{room.occupant?.toLowerCase() === "empty" || !room.occupant ? "Vacant" : "Occupied"}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>

      <Wrapper>
        <ComplaintsWrapper>
          <h3>Hostel Complaints</h3>
          <div className="complaint-list">
            {hostelComplaints.length === 0 ? (
              <p className="no-data">No complaints found.</p>
            ) : (
              hostelComplaints.map((c, index) => (
                <div key={index} className="complaint-card">
                  <div className="top">
                    <span><strong>By:</strong> {c.name}</span>
                    <span><strong>Hostel:</strong> {c.hostel}</span>
                  </div>
                  <div className="matter">{c.matter}</div>
                  <div className="timestamp">
                    {new Date(c.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </ComplaintsWrapper>
      </Wrapper>
    </Container>
  );
}
