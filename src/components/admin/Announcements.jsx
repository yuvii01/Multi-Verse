import { useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/Styles.js";

const AnnouncementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;


export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const StyledTextarea = styled.textarea`
  resize: none;
  height: 100px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

export const StyledDateInput = styled.input.attrs({ type: "date" })`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
  background-color: #fff;
  color: #333;
  cursor: pointer;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #007bff;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.4);
    cursor: pointer;
  }

`;

export const StyledFileInput = styled.input.attrs({ type: "file" })`
  padding: 10px 14px;
  background-color: #f0f0f0;
  border: 1px dashed #aaa;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &::file-selector-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 10px;
  }

  &:hover {
    border-color: #007bff;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f4f6f8;
  border-radius: 8px;
`;

const AnnouncementBox = styled.div`
  background: #ffffff;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-left: 5px solid #1976d2;
  border-radius: 6px;
`;

const Label = styled.label`
  font-weight: 600;
`;





const RightContent = styled.div`
  width: 150px;
  height: auto;
`;
const FilePreview = styled.img`
  width: 100px;
  height: auto;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PdfThumbnail = styled.img`
  width: 80px;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;


const Button = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
`;

const AdminControls = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  background: #ffc107;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export default function Announcements() {
  const [announcement, setAnnouncement] = useState({

    announcement: "",
    date: "",
    file: null,
    filePreview: null,
    viewOnly: [],
  });
  const isAdmin = true; // 👈 Replace with actual logic from user context/auth
  const [editingId, setEditingId] = useState(null);


  const [allAnnouncements, setAllAnnouncements] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;



    if (name === "file") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setAnnouncement((prev) => ({
          ...prev,
          file: file,
          filePreview: reader.result,
        }));
      };

      if (file && (file.type.startsWith("image") || file.type === "application/pdf")) {
        reader.readAsDataURL(file);
      }
    }
    else if (type === "checkbox") {
      setAnnouncement((prev) => {
        const updatedViewOnly = checked
          ? [...prev.viewOnly, value]
          : prev.viewOnly.filter((v) => v !== value);
        return { ...prev, viewOnly: updatedViewOnly };
      });
    } else {
      setAnnouncement({ ...announcement, [name]: value });
    }
  };

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Edit existing announcement
        setAllAnnouncements((prev) =>
          prev.map((a) =>
            a.id === editingId ? { ...a, ...announcement } : a
          )
        );
        setEditingId(null); // reset edit mode
      } else {
        // Create new announcement
        const newAnnouncement = {
          ...announcement,
          id: Date.now(), // unique ID
        };
        setAllAnnouncements((prev) => [newAnnouncement, ...prev]);
      }

      // Reset form
      setAnnouncement({
        announcement: "",
        date: "",
        viewOnly: [],
        file: null,
        filePreview: null,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = (announcementData) => {
    setAnnouncement(announcementData);
    setEditingId(announcementData.id); // 👈 Enable edit mode
  };


  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
    if (confirmDelete) {
      setAllAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };


  return (
    <Container>
      <AnnouncementContainer>

        <FormWrapper onSubmit={handleSubmitAnnouncement}>
          <h1>Post Announcement</h1>
          <StyledTextarea
            required
            name="announcement"
            value={announcement.announcement}
            onChange={handleChange}
            placeholder="Write a short description..."
          />

          <StyledFileInput
            required
            name="file"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.pdf"
          />

          <StyledDateInput
            required
            name="date"
            value={announcement.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />

          <div>
            <Label>Visible to:</Label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label>
                <input
                  type="checkbox"
                  value="teacher"
                  checked
                  onChange={handleChange}
                />
                Teacher
              </label>
              <label>
                <input
                  type="checkbox"
                  value="student"
                  checked={announcement.viewOnly.includes("student")}
                  onChange={handleChange}
                />
                Student
              </label>

            </div>
          </div>

          <Button type="submit" style={{ backgroundColor: editingId ? "#ffc107" : "#1976d2" }}>
            {editingId ? "Update" : "Post"}
          </Button>
        </FormWrapper>


        <RightPanel>
          <h2>All Announcements</h2>

          {allAnnouncements.length === 0 && <p>No announcements yet.</p>}

          {allAnnouncements.map((a) => (
            <AnnouncementBox key={a.id}>
              <TopRow>
                <strong>{new Date(a.date).toDateString()}</strong>
                {isAdmin && (
                  <AdminControls>
                    <EditButton onClick={() => handleEdit(a)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(a.id)}>Delete</DeleteButton>
                  </AdminControls>
                )}
              </TopRow>

              <p>{a.announcement}</p>

              {a.filePreview && (
                <RightContent>
                  {a.file?.type === "application/pdf" ? (
                    <a href={a.filePreview} download={a.file.name || "announcement.pdf"}>
                      <PdfThumbnail src="/pdf-icon.png" alt="PDF File" />
                    </a>
                  ) : (
                    <a href={a.filePreview} target="_blank" rel="noopener noreferrer">
                      <FilePreview src={a.filePreview} alt="Announcement Image" />
                    </a>
                  )}
                </RightContent>
              )}
            </AnnouncementBox>
          ))}

        </RightPanel>
      </AnnouncementContainer>
    </Container>
  );
}
