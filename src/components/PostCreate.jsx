import React, { useState } from "react";
import styled from "styled-components";
import { fileToBase64 } from "../utils/fileToBase64";

// Styled Components
const FormContainer = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
  resize: vertical;
`;

const Label = styled.label`
  font-weight: 500;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  margin-right: 1rem;
  font-size: 0.95rem;
`;

const FileInput = styled.input`
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #3f9c43;
  }
`;

export default function PostCreate({ currentUser }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    className: "",
    subject: "",
    audience: [],
    allowComments: true,
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "audience") {
      const updated = checked
        ? [...form.audience, value]
        : form.audience.filter((v) => v !== value);
      setForm({ ...form, audience: updated });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePost = async () => {
    const posts = JSON.parse(localStorage.getItem("school_posts") || "[]");

    const imageBase64 = image ? await fileToBase64(image) : null;
    const pdfBase64 = pdf ? await fileToBase64(pdf) : null;

   const newPost = {
  id: Date.now(),
  createdAt: new Date().toISOString(), // ✅ Add timestamp here
  ...form,
  authorId: currentUser.id,
  authorName: currentUser.username,
  authorRole: currentUser.role,
  imageUrl: imageBase64,
  pdfUrl: pdfBase64,
  likes: [],
  comments: [],
};


    posts.push(newPost);
    localStorage.setItem("school_posts", JSON.stringify(posts));
    alert("Post created!");

    // Reset
    setForm({
      title: "",
      content: "",
      className: "",
      subject: "",
      audience: [],
      allowComments: true,
    });
    setImage(null);
    setPdf(null);
  };

  return (
    <FormContainer>
      <Input
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
      />
      <TextArea
        name="content"
        placeholder="What's the update?"
        rows={4}
        value={form.content}
        onChange={handleChange}
      />
      <Input
        name="className"
        placeholder="Class (e.g., Class 10)"
        value={form.className}
        onChange={handleChange}
      />
      <Input
        name="subject"
        placeholder="Subject (e.g., Physics)"
        value={form.subject}
        onChange={handleChange}
      />

      <Label>Audience:</Label>
      <div>
        <CheckboxLabel>
          <input
            type="checkbox"
            name="audience"
            value="student"
            checked={form.audience.includes("student")}
            onChange={handleChange}
          />
          Students
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            name="audience"
            value="teacher"
            checked={form.audience.includes("teacher")}
            onChange={handleChange}
          />
          Teachers
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            name="audience"
            value="admin"
            checked={form.audience.includes("admin")}
            onChange={handleChange}
          />
          Admins
        </CheckboxLabel>
      </div>

      <CheckboxLabel>
        <input
          type="checkbox"
          name="allowComments"
          checked={form.allowComments}
          onChange={handleChange}
        />
        Allow Comments
      </CheckboxLabel>

      <div>
        <Label>Attach Image (optional):</Label>
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div>
        <Label>Attach PDF (optional):</Label>
        <FileInput
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />
      </div>

      <SubmitButton onClick={handlePost}>Create Post</SubmitButton>
    </FormContainer>
  );
}
