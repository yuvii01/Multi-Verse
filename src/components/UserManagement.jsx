import { useState, useEffect } from "react";
import { createUser, getUsers } from "../api/users";

export default function UserManagement({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "", password: "", role: "teacher"
  });

  const allowedChildRoles = {
    superadmin: ["admin"],
    admin: ["teacher", "student"]
  };

  useEffect(() => {
    setUsers(getUsers().filter(u => u.parentId === currentUser.id));
  }, [currentUser.id]);

  const handleAddUser = () => {
    createUser({
      ...newUser,
      parentId: currentUser.id
    });
    setNewUser({ username: "", password: "", role: allowedChildRoles[currentUser.role][0] });
    setUsers(getUsers().filter(u => u.parentId === currentUser.id));
  };

  return (
    <div>
      <h4>Manage Users ({allowedChildRoles[currentUser.role].join(", ")})</h4>

      <input placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
      <input placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
        {allowedChildRoles[currentUser.role].map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
