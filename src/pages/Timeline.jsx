import styled from 'styled-components';
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Page = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function Timeline() {
  return (
    <Page>
      <Title>📅 School Timeline</Title>
      <PostForm onPost={() => window.location.reload()} />
      <PostList />
    </Page>
  );
}
