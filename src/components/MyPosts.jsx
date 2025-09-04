import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const SubHeading = styled.h3`
  margin-top: 1.5rem;
  color: #2c3e50;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 5px solid #1565c0;
  flex-wrap: wrap;
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  border: 3px solid #1565c0;
`;

const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ProfileName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
`;

const RoleTag = styled.span`
  background-color: #e3f2fd;
  color: #1565c0;
  padding: 0.3rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-left: 0.75rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem 2rem;
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  color: #333;
  font-size: 0.95rem;
  strong {
    color: #1565c0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 1rem 0;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background-color: ${({ present }) => (present ? "#4caf50" : "#ef5350")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  &:hover {
    background-color: ${({ present }) => (present ? "#43a047" : "#e53935")};
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoBox = styled.div`
  background: #e0f2fe;
  padding: 1rem;
  border-radius: 8px;
  flex: 1 1 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
`;

const PostCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 5px solid #4caf50;
`;

const PostTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Meta = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const Content = styled.p`
  margin: 1rem 0;
  line-height: 1.6;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const FileLink = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.4rem 0.75rem;
  background-color: #e3f2fd;
  color: #1565c0;
  border-radius: 6px;
  font-size: 0.95rem;
  text-decoration: none;
  &:hover {
    background-color: #bbdefb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarPopup = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export default function MyPosts({ onLogout }) {
  const [myPosts, setMyPosts] = useState([]);
  const [teacherAttendance, setTeacherAttendance] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const user = {
    id: "teacher123",
    name: "John Doe",
    age: 40,
    profileImage: "https://static.vecteezy.com/system/resources/thumbnails/054/580/992/small/a-smiling-woman-in-a-classroom-photo.jpeg",
    joinDate: "2018-06-15T09:00:00",
    classTeacher: "Class 8B",
    department: "Science",
    email: "johndoe@school.edu",
    phone: "9876543210"
  };

  const teacher = {
    name: "John Doe",
    assignedClasses: ["Class A", "Class B"],
    totalLeaves: 12,
  };

  const today = new Date().toLocaleDateString();

  const toggleTeacherAttendance = () => {
    if (teacherAttendance.includes(today)) {
      setTeacherAttendance(teacherAttendance.filter((d) => d !== today));
    } else {
      setTeacherAttendance([...teacherAttendance, today]);
    }
  };

  const leavesRemaining = teacher.totalLeaves - (teacherAttendance.length || 0);

  useEffect(() => {
    if (!user) return;
    const posts = JSON.parse(localStorage.getItem("school_posts") || "[]");
    const userPosts = posts
      .filter((post) => post.authorId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMyPosts(userPosts);
  }, []);

  const renderCalendar = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <ModalOverlay onClick={() => setShowCalendar(false)}>
        <CalendarPopup onClick={(e) => e.stopPropagation()}>
          <h3>Attendance - {now.toLocaleString('default', { month: 'long' })} {now.getFullYear()}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", marginTop: "1rem" }}>
            {monthDates.map((day) => {
              const dateStr = new Date(now.getFullYear(), now.getMonth(), day).toLocaleDateString();
              const isPresent = teacherAttendance.includes(dateStr);
              return (
                <div
                  key={day}
                  style={{
                    padding: "0.5rem",
                    background: isPresent ? "#c8e6c9" : "#ffcdd2",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <Button style={{ marginTop: "1.5rem" }} onClick={() => setShowCalendar(false)}>Close</Button>
        </CalendarPopup>
      </ModalOverlay>
    );
  };

  return (
    <Container>
      <ProfileCard>
        <ProfileImage src={user.profileImage || "https://via.placeholder.com/110"} alt="Profile" />
        <ProfileDetails>
          <ProfileHeader>
            <ProfileName>{user.name}<RoleTag>Teacher</RoleTag></ProfileName>
          </ProfileHeader>
          <Divider />
          <DetailsGrid>
            <DetailItem><strong>Age:</strong> {user.age}</DetailItem>
            <DetailItem><strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}</DetailItem>
            <DetailItem><strong>Class Teacher:</strong> {user.classTeacher}</DetailItem>
            <DetailItem><strong>Department:</strong> {user.department}</DetailItem>
            <DetailItem><strong>Email:</strong> {user.email}</DetailItem>
            <DetailItem><strong>Phone:</strong> {user.phone}</DetailItem>
          </DetailsGrid>
          <Button onClick={onLogout}>Logout</Button>
        </ProfileDetails>
      </ProfileCard>

      <InfoRow>
        <InfoBox>Assigned Classes: {teacher.assignedClasses.join(", ")}</InfoBox>
        <InfoBox>Leaves Remaining: {leavesRemaining}</InfoBox>
        <InfoBox>Total Attendance Marked: {teacherAttendance.length} days</InfoBox>
      </InfoRow>

      <SubHeading>Today's Attendance ({today}):</SubHeading>
      <Button present={teacherAttendance.includes(today)} onClick={toggleTeacherAttendance}>
        {teacherAttendance.includes(today) ? "Present" : "Mark Present"}
      </Button>
      <Button style={{ marginLeft: "1rem" }} onClick={() => setShowCalendar(true)}>
        View Monthly Attendance
      </Button>

      <Title>📌 My Posts</Title>
      {myPosts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        myPosts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <Meta><strong>Subject:</strong> {post.subject || "N/A"}</Meta>
            <Meta><strong>Class:</strong> {post.className || "N/A"}</Meta>
            <Meta><strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}</Meta>
            <Content>{post.content}</Content>
            {post.imageUrl && <Image src={post.imageUrl} alt="attachment" />}
            {post.pdfUrl && (
              <FileLink href={post.pdfUrl} download={`mypost-${post.id}.pdf`} target="_blank" rel="noopener noreferrer">
                📎 View PDF Attachment
              </FileLink>
            )}
          </PostCard>
        ))
      )}

      {showCalendar && renderCalendar()}
    </Container>
  );
}
