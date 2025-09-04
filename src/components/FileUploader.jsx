import styled from 'styled-components';
import { useState } from "react";
import { uploadFile } from "../api/files";

const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const UploadButton = styled.button`
  background: #16a34a;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
`;

export default function FileUploader({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(formData);
    onUpload();
  };

  return (
    <Uploader>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
    </Uploader>
  );
}
