import React, { useState } from "react";
import styled from "styled-components";

// Dummy student data
const studentsData = [
  { id: 1, name: "Alice Johnson", grade: "5th Grade" },
  { id: 2, name: "Benjamin Lee", grade: "5th Grade" },
  { id: 3, name: "Chloe Kim", grade: "5th Grade" },
  { id: 4, name: "Daniel Smith", grade: "5th Grade" },
  { id: 5, name: "Eva Green", grade: "5th Grade" },
  { id: 6, name: "Frankie Doe", grade: "5th Grade" },
  { id: 7, name: "Grace Liu", grade: "5th Grade" },
  { id: 8, name: "Henry Adams", grade: "5th Grade" },
  { id: 9, name: "Isla Brown", grade: "5th Grade" },
  { id: 10, name: "Jack Wilson", grade: "5th Grade" },
];

// Sort students alphabetically by name
const students = [...studentsData].sort((a, b) =>
  a.name.localeCompare(b.name)
);

// Styled components
const ChatContainer = styled.div`
  margin-top: 2rem;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  height: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StudentList = styled.div`
  width: 220px;
  border-right: 1px solid #eee;
  background: #f7f9fc;
  padding: 1rem;
  overflow-y: auto;
`;

const StudentItem = styled.div`
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#3f51b5" : "#e0e7ff")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background: #c7d2fe;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

const ChatSection = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
`;

const ChatMessage = styled.div`
  margin-bottom: 0.6rem;
`;

const MessageInput = styled.textarea`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  resize: none;
`;

const SendButton = styled.button`
  align-self: flex-end;
  background: #3f51b5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #303f9f;
  }
`;

export default function StudentChat() {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentChat = chats[selectedStudentId] || [];

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: "Teacher",
      text: message,
    };

    setChats({
  ...chats,
  [selectedStudentId]: [...(currentChat || []), newMessage], // put new message at end
});

    setMessage("");
  };

  return (
    <ChatContainer>
      <StudentList>
        <SearchInput
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredStudents.map((student) => (
          <StudentItem
            key={student.id}
            active={student.id === selectedStudentId}
            onClick={() => setSelectedStudentId(student.id)}
          >
            {student.name}
            <br />
            <small>{student.grade}</small>
          </StudentItem>
        ))}
      </StudentList>

      <ChatSection>
        <h4>
          Chat with{" "}
          {
            students.find((s) => s.id === selectedStudentId)
              ?.name
          }
        </h4>
        <ChatBox>
          {currentChat.map((msg, idx) => (
            <ChatMessage key={idx}>
              <strong>{msg.sender}:</strong> {msg.text}
            </ChatMessage>
          ))}
        </ChatBox>
        <MessageInput
          rows={2}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </ChatSection>
    </ChatContainer>
  );
}
