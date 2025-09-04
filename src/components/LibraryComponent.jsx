import { useState } from 'react';
import {
  Container,
  Input,
  Select,
  SelectWrapper,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  UtilityContainer,
  Button,
} from '../styles/Styles.js';
import useDebounce from '../utils/Debounce.jsx';
import { dummyLibraryBooks } from '../assets/LibraryBooks.js';
import { MdDelete } from "react-icons/md";
const subjects = ["Mathematics", "Science", "English", "Hindi", "History", "Geography", "Civics", "Econnomy", "Computer", "Sanskrit"];

const LibraryComponent = () => {
  const [books, setBooks] = useState(dummyLibraryBooks);
  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const debouncedInput = useDebounce(input, 300);

  const searchBook = (e) => {
    setInput(e.target.value);
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };

  const handleDelete = (bookId) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
      setBooks(prev => prev.filter(book => book.bookId !== bookId));
    }
  };
  const filteredBooks = dummyLibraryBooks.filter((bk) => {
    const lowerInput = debouncedInput.toLowerCase();
    const matchesSearch = bk.title.toLowerCase().includes(lowerInput);
    const matchesAuthor = bk.author.toLowerCase().includes(lowerInput);
    const matchesClass = selectedClass ? bk.classLevel.toString() === selectedClass : true;
    const matchesSubject = selectedSubject ? bk.subject.toLowerCase() === selectedSubject.toLowerCase() : true;

    return (matchesSearch || matchesAuthor) && matchesClass && matchesSubject;
  });


  return (
    <Container>
      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by book title or author"
          value={input}
          onChange={searchBook}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <SelectWrapper>
            <Select
              id="class-select"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="">All Classes</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </Select>
          </SelectWrapper>

          <SelectWrapper>
            <Select
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </Select>
          </SelectWrapper>
        </div>
      </UtilityContainer>

      <Table>
        <Thead>
          <Tr>
            <Th>Book ID</Th>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Subject</Th>
            <Th>Class</Th>
            <Th>Year</Th>
            <Th>Language</Th>
            <Th colSpan={2}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((bk, idx) => (
              <Tr key={idx}>
                <Td>{bk.bookId}</Td>
                <Td>{bk.title}</Td>
                <Td>{bk.author}</Td>
                <Td>{bk.subject}</Td>
                <Td>{bk.classLevel}</Td>
                <Td>{bk.publicationYear}</Td>
                <Td>{bk.language}</Td>

                <Td>
                  <MdDelete
                    style={{
                      color: "#d32f2f",
                      fontSize: "24px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#ffe6e6";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.transform = "scale(1)";
                    }}
                    onClick={() => handleDelete(bk.bookId)}
                  />

                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="9" style={{ textAlign: "center", padding: "1rem" }}>
                No books found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default LibraryComponent;
