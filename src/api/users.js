// src/api/users.js

// Fetch all users from localStorage
export function getUsers() {
  return JSON.parse(localStorage.getItem("school_users") || "[]");
}

// Create/add a new user
export function createUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("school_users", JSON.stringify(users));
}

// Set current session (logged-in user)
export function setSession(user) {
  localStorage.setItem("school_session", JSON.stringify(user));
}

// Get current session (logged-in user)
export function getSession() {
  return JSON.parse(localStorage.getItem("school_session"));
}

// Clear session on logout
export function clearSession() {
  localStorage.removeItem("school_session");
}
