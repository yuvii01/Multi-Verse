import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getSession, clearSession } from "./api/users";
import ClassTimetable from "./components/teacher/ClassTimeTable";
import MyClass from "./components/teacher/MyClass";
import ExamsLesson from "./components/teacher/ExamsLesson";
import StudentChat from "./components/teacher/StudentChat";
import LibraryManagement from "./components/LibraryComponent";
import TransportTracking from "./components/TransportTracking";
import MyPosts from "./components/MyPosts";
import FeeStatus from "./components/student/FeeStatus";
import MyClassStu from "./components/student/MyClassStu";
import TeacherAttendance from "./components/teacher/TeacherAttendence";
import AttendanceModule from "./components/teacher/AttendenceTeacher";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

import ManageStaffs from "./components/admin/ManageStaffs.jsx";
import ManageStudents from "./components/admin//ManageStudents.jsx";
import ClassReports from "./components/admin//ClassReports.jsx";
import ManageAttendances from "./components/admin//ManageAttendances.jsx";
import AssignSubjects from "./components/admin//AssignSubjects.jsx";

import HostelManagement from "./components/admin/HostelManagement.jsx";
import Announcements from "./components/admin/Announcements.jsx";
import ManageTimeTable from "./components/admin/ManageTimeTable.jsx";
import LeaveRequest from "./components/admin/LeaveRequest.jsx";
import InventoryManagement from "./components/admin/InventoryManagement.jsx";
import DisciplinaryRecord from "./components/admin/DisciplinaryRecord.jsx";
import FeedbackAndSuggestion from "./components/admin/FeedbackAndSuggestion.jsx";
import ScholorShipManage from "./components/admin/ScholorShipManage.jsx";
import OnlineAdmission from "./components/admin/OnlineAdmission.jsx";




// Main AppLayout
function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };


  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      <Route
        path="/create-post"
        element={<PostCreate onLogout={handleLogout} />}
      />
      <Route
        path="/view-post"
        element={<PostList currentUser={user} />}
      />
      <Route
        path="/my-classes"
        element={<MyClass user={user} onLogout={handleLogout} />}
      />
      <Route
        path="/student/my-classes"
        element={<MyClassStu user={user} onLogout={handleLogout} />}
      />
      <Route
        path="/teacherattendence"
        element={<AttendanceModule user={user} onLogout={handleLogout} />}
      />
      <Route
        path="/student/fee-status"
        element={<FeeStatus user={user} onLogout={handleLogout} />}
      />
      <Route
        path="/studentleaves"
        element={<TeacherAttendance user={user} onLogout={handleLogout} />}
      />


      <Route
        path="/class-timetable"
        element={<ClassTimetable onLogout={handleLogout} />}
      />

      <Route
        path="/exams-lesson-planner"
        element={<ExamsLesson onLogout={handleLogout} />}
      />
      <Route
        path="/messages"
        element={<StudentChat onLogout={handleLogout} />}
      />
      <Route
        path="/library"
        element={<LibraryManagement onLogout={handleLogout} />}
      />

      <Route
        path="/bus-tracking"
        element={<TransportTracking user={user} onLogout={handleLogout} />}
      />

      <Route
        path="/my-profile"
        element={<MyPosts user={user} onLogout={handleLogout} />}
      />

          //admin Routes
      <Route
        path="/admin/staffs"
        element={<ManageStaffs />}
      />
      <Route
        path="/admin/students"
        element={<ManageStudents />}
      />
      <Route
        path="/admin/reports"
        element={<ClassReports />}
      />
      <Route
        path="/admin/attendance"
        element={<ManageAttendances />}
      />
      <Route
        path="/admin/announcement"
        element={<Announcements />}
      />
      <Route
        path="/admin/assign-subjects"
        element={<AssignSubjects />}
      />

      <Route
        path="/admin/timetable"
        element={<ManageTimeTable />}
      />
      <Route
        path="/admin/hostel"
        element={<HostelManagement />}
      />
      <Route
        path="/admin/leave-requests"
        element={<LeaveRequest />}
      />
      <Route
        path="/admin/inventory"
        element={<InventoryManagement />}
      />
      <Route
        path="/admin/discipline"
        element={<DisciplinaryRecord />}
      />
      <Route
        path="/admin/feedback"
        element={<FeedbackAndSuggestion />}
      />
      <Route
        path="/admin/scholarships"
        element={<ScholorShipManage />}
      />
      <Route
        path="/admin/online-admissions"
        element={<OnlineAdmission />}
      />



      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


export default function App() {
  const isLoggedIn = !!getSession();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
