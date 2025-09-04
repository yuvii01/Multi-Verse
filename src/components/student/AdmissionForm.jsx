import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FileInput = styled.input`
  border: none;
`;

const Button = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #388e3c;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

export default function AdmissionForm({ user }) {
  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    dob: "",
    address: "",
    email: "",
    course: "BSc Computer Science",
    document: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate submission
    console.log("Admission Form Submitted:", formData);
    setSubmitted(true);

    // Reset after a delay (simulate success)
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Address</Label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Course</Label>
          <Select
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option>BSc Computer Science</option>
            <option>BA English</option>
            <option>BCom Finance</option>
            <option>BBA Management</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Upload ID/Marksheet</Label>
          <FileInput
            type="file"
            name="document"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">Submit Application</Button>
        {submitted && <SuccessMessage>Application submitted successfully!</SuccessMessage>}
      </form>
    </FormContainer>
  );
}
