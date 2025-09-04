import React, { useState } from "react";
import styled from "styled-components";

const PlannerContainer = styled.div`
  padding: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.4rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: #3f51b5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ChatBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f4f6fa;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const ChatMessage = styled.div`
  margin-bottom: 0.5rem;
`;

export default function LessonPlanner() {
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chat, setChat] = useState([
    { sender: "Parent", text: "Can you share the homework?" },
    { sender: "Teacher", text: "Sure, uploading it now." },
  ]);

  const handleUpload = () => {
    console.log("Lesson Notes:", notes);
    console.log("File Uploaded:", file?.name);
    alert("Lesson saved!");
  };

  const sendChat = () => {
    if (!chatInput) return;
    setChat([{ sender: "Teacher", text: chatInput }, ...chat]);
    setChatInput("");
  };

  return (
    <PlannerContainer>
      <h3>Lesson Planning</h3>
      <TextArea
        rows={5}
        placeholder="Write your lesson objectives or plan here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Input
        type="file"
        accept=".pdf,.doc,.ppt"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <Button onClick={handleUpload}>Save Lesson</Button>

      {/* <h4 style={{ marginTop: "2rem" }}>In-App Chat (Teacher ↔ Parent)</h4>
      <TextArea
        rows={2}
        placeholder="Type a message..."
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <Button onClick={sendChat}>Send</Button>

      <ChatBox>
        {chat.map((msg, index) => (
          <ChatMessage key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </ChatMessage>
        ))}
      </ChatBox> */}
    </PlannerContainer>
  );
}
