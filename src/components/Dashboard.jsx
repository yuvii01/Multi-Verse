import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../api/users";

import ParentDashboard from "./ParentDashboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: "Segoe UI", sans-serif;
`;

const Header = styled.div`
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1976d2;
  text-align: center;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;



const LogoutButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;

  &:hover {
    background: #c0392b;
  }

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


const Tile = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 0.5rem;

    @media (min-width: 600px) {
      width: 50px;
      height: 50px;
    }
  }

  p {
    font-size: 0.85rem;
    color: #333;

    @media (min-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: center;
  }
`;

const WelcomeImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 250px;
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #fdfdfd;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 2rem 0;
`;

const Card = styled.div`
  background: #fff7ec;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  h4 {
    color: #666;
  }

  h2 {
    margin: 10px 0;
    color: #28a745;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const Section = styled.section`
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 14px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
`;


const menus = {
  teacher: [
    { title: "My Profile", icon: "https://as2.ftcdn.net/jpg/00/24/86/11/1000_F_24861198_7J0bNWHiTYCHFa2nVZNIWFzMiTIbKxpI.jpg", click: '/my-profile' },
    { title: "My Attendance", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFkqK1OGu-QaRstMr8zio7bOEshNc6VSd1Q&s", click: '/teacherattendence' },
    { title: "Student Leaves", icon: "https://static.vecteezy.com/system/resources/previews/030/940/508/non_2x/leave-icon-vector.jpg", click: '/studentleaves' },
    { title: "Assignments", icon: "https://cdn-icons-png.flaticon.com/512/11265/11265088.png", click: '/assignments' },
    { title: "Marks Upload", icon: "https://cdn-icons-png.flaticon.com/512/3979/3979312.png", click: '/marksupload' },
    { title: "Time Table", icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png", click: '/timetable' },
    { title: "E-Notice", icon: "https://cdn3.vectorstock.com/i/1000x1000/61/77/concept-of-email-notification-icon-vector-11226177.jpg", click: '/enotice' },
    { title: "Online Class", icon: "https://cdn-icons-png.freepik.com/512/4722/4722426.png", click: '/onlineclass' },
    { title: "Syllabus", icon: "https://cdn-icons-png.flaticon.com/512/4708/4708448.png", click: '/syllabus' },
    { title: "Assessments", icon: "https://cdn-icons-png.flaticon.com/512/11265/11265088.png", click: '/assessments' }
  ],

  admin: [
    { title: "Manage Staffs", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png", click: "/admin/staffs" },
    { title: "Manage Students", icon: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png", click: "/admin/students" },
    { title: "Class Reports", icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png", click: "/admin/reports" },
    { title: "All Attendances", icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png", click: "/admin/attendance" },
    { title: "School Announcement", icon: "https://cdn-icons-png.flaticon.com/512/1057/1057246.png", click: "/admin/announcement" },
    { title: "Assign Subjects", icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png", click: "/admin/assign-subjects" },
    { title: "Manage Timetable", icon: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png", click: "/admin/timetable" },
    { title: "Hostel/Dorm", icon: "https://cdn-icons-png.flaticon.com/512/2731/2731225.png", click: "/admin/hostel" },
    { title: "Bus Tracking", icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", click: "/bus-tracking" },
    { title: "Library", icon: "https://cdn-icons-png.flaticon.com/512/2702/2702130.png", click: "/library" },
    { title: "Leave Requests", icon: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png", click: "/admin/leave-requests" },
    { title: "Inventory Management", icon: "https://cdn-icons-png.flaticon.com/512/1170/1170627.png", click: "/admin/inventory" },
    { title: "Disciplinary Records", icon: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png", click: "/admin/discipline" },
    { title: "Feedback & Suggestions", icon: "https://cdn-icons-png.flaticon.com/512/3143/3143684.png", click: "/admin/feedback" },
    { title: "Scholarship Manager", icon: "https://cdn-icons-png.flaticon.com/512/1037/1037072.png", click: "/admin/scholarships" },
    { title: "Online Admission", icon: "https://cdn-icons-png.flaticon.com/512/3594/3594419.png", click: "/admin/online-admissions" }
  ],

  student: [
    { title: "My Profile", icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png", click: "/student/profile" },
    { title: "My Subjects", icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", click: "/student/subjects" },
    { title: "Homework & Assignments", icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png", click: "/student/homework" },
    { title: "Ask Doubts", icon: "https://cdn-icons-png.flaticon.com/512/9073/9073142.png", click: "/student/doubts" },
    { title: "My Classes", icon: "https://cdn-icons-png.flaticon.com/512/1995/1995521.png", click: "/student/classes" },
    { title: "Quiz/Practice", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135748.png", click: "/student/quizzes" },
    { title: "Announcements", icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png", click: "/student/announcements" },
    { title: "Time Table", icon: "https://cdn-icons-png.flaticon.com/512/3418/3418511.png", click: "/student/timetable" },
    { title: "Attendance Report", icon: "https://cdn-icons-png.flaticon.com/512/2721/2721169.png", click: "/student/attendance" },
    { title: "Fees & Payments", icon: "https://cdn-icons-png.flaticon.com/512/5282/5282478.png", click: "/student/fees" },
    { title: "Library Access", icon: "https://cdn-icons-png.flaticon.com/512/3145/3145765.png", click: "/student/library" },
    { title: "School Events", icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png", click: "/student/events" },
    { title: "Hostel Info", icon: "https://cdn-icons-png.flaticon.com/512/1518/1518982.png", click: "/student/hostel" },
    { title: "Transport Details", icon: "https://cdn-icons-png.flaticon.com/512/3081/3081648.png", click: "/student/transport" },
    { title: "Contact Teachers", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", click: "/student/contact-teachers" },
    { title: "Results", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", click: "/student/results" }
  ]
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, []);

  const handleLogout = () => {
    clearSession();
    window.location.reload();
    navigate("/");
  };
  

  if (!user) return null;



  return (
    <Container>
      <Main>
        <Header>
          <WelcomeSection>
            <WelcomeImage src="/teacher.png" alt="Welcome illustration" />
            <div>
              <p style={{ margin: 0, fontSize: "1rem", color: "#fff" }}>Welcome back</p>
              <h2 style={{ margin: "0.2rem 0", color: "#fff" }}>{user.username}!</h2>
              <p style={{ maxWidth: "600px", color: "#e3e3e3" }}>
                We would like to take this opportunity to welcome you to our practice...
              </p>
            </div>
          </WelcomeSection>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>

        {role === "parent" && (
          <Section>
            <h3>Parent Portal</h3>
            <ParentDashboard user={user} />
          </Section>
        )}

        {role === "admin" && (
          <CardGrid>
            <Card>
              <h4>Students</h4>
              <h2>1,204</h2>
              <p>📘 Currently Enrolled</p>
            </Card>
            <Card>
              <h4>Events</h4>
              <h2>12</h2>
              <p>📅 This Month</p>
            </Card>
            <Card>
              <h4>Teachers</h4>
              <h2>89</h2>
              <p>👩‍🏫 Active Staff</p>
            </Card>
            <Card>
              <h4>Fees Collected</h4>
              <h2>$48,697</h2>
              <p>💰 This Quarter</p>
            </Card>
          </CardGrid>
        )}

        <GridContainer>
          {(menus[role] || []).map((item, idx) => (
            <Tile onClick={() => navigate(item.click)} key={idx}>
              <img src={item.icon} alt={item.title} />
              <p>{item.title}</p>
            </Tile>
          ))}
        </GridContainer>

      </Main>
    </Container>
  );


};


