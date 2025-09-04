import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #125ea8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #1976d2;
  color: white;
  padding: 0.75rem;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.75rem;
`;

export default function ExamAssignmentManager() {
  const [type, setType] = useState("exam");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = () => {
    if (!title || !details || !dueDate) {
      return alert("All fields are required.");
    }
    setList([...list, { type, title, details, dueDate, status: "Pending" }]);
    setTitle("");
    setDetails("");
    setDueDate("");
  };

  return (
    <Wrapper>
      <h3>Exam & Assignment Handling</h3>
      <Form>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="exam">Exam</option>
          <option value="assignment">Assignment</option>
        </Select>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          rows="4"
          placeholder="Description or Instructions"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </Form>

      {list.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Title</Th>
              <Th>Details</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <tr key={idx}>
                <Td>{item.type}</Td>
                <Td>{item.title}</Td>
                <Td>{item.details}</Td>
                <Td>{item.dueDate}</Td>
                <Td>{item.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
}
