import styled from 'styled-components';
import { useEffect, useState } from "react";
import { fetchFiles } from "../api/files";

const FileBox = styled.div`
  border: 1px solid #eee;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const FileButton = styled.button`
  margin-left: 1rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function FileViewer() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles().then(setFiles);
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      {files.map(file => (
        <FileBox key={file.id}>
          <a href={file.url} download>{file.name}</a>
          <FileButton onClick={() => handleCopy(file.url)}>📤 Copy Link</FileButton>
        </FileBox>
      ))}
    </>
  );
}
