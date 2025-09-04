import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, setSession, getSession } from "../api/users";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2563eb;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
`;

const SwitchLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.25rem;
  &:hover {
    color: #2563eb;
  }
`;

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const navigate = useNavigate();

  useEffect(() => {
    // Create default users if no users exist
    const defaultUsers = [
      { id: 1, username: "admin@gmail.com", password: "aaaaaa", role: "admin", parentId: null },
      { id: 2, username: "teacher@gmail.com", password: "aaaaaa", role: "teacher", parentId: null },
      { id: 3, username: "student@gmail.com", password: "aaaaaa", role: "student", parentId: null }
    ];

    const existingUsers = getUsers();

    if (!existingUsers || existingUsers.length === 0) {
      defaultUsers.forEach(user => createUser(user));
    }
  }, []);

  useEffect(() => {
    if (getSession()) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    // Auto-set role based on email for default users
    if (name === "username") {
      if (value === "admin@gmail.com") updatedForm.role = "admin";
      else if (value === "teacher@gmail.com") updatedForm.role = "teacher";
      else if (value === "student@gmail.com") updatedForm.role = "student";
    }

    setForm(updatedForm);
  };

  const handleLogin = () => {
    const user = getUsers().find(
      u => u.username === form.username && u.password === form.password && u.role === form.role
    );

    if (user) {
      setSession(user);
      window.location.reload();
    } else {
      alert("Invalid credentials or role mismatch");
    }
  };

  const handleSignup = () => {
    const users = getUsers();
    if (users.find(u => u.username === form.username && u.role === form.role)) {
      alert("User already exists with this role");
      return;
    }
    const newUser = {
      ...form,
      id: Date.now(),
      parentId: null
    };
    createUser(newUser);
    setSession(newUser);
    navigate("/");
  };

  return (
    <Container>
      <Card>
        <Title>{isSignup ? "Create an Account" : "Login to Your Account"}</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </Select>
          <Button onClick={isSignup ? handleSignup : handleLogin}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </div>
        <SwitchText>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <SwitchLink onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </SwitchLink>
        </SwitchText>
      </Card>
    </Container>
  )
}
