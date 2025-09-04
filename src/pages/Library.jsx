import styled from 'styled-components';
import FileUploader from "../components/FileUploader";
import FileViewer from "../components/FileViewer";

const Page = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function Library() {
  return (
    <Page>
      <Title>🗂 Library</Title>
      <FileUploader onUpload={() => window.location.reload()} />
      <FileViewer />
    </Page>
  );
}
