import styled from 'styled-components';
import { useState } from "react";
import { createPost } from "../api/posts";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

export default function PostForm({ onPost }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ text, class: "10", subject: "Math", uploadedBy: "Teacher A" });
    onPost();
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder="Write an update..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">Post</Button>
    </Form>
  );
}
