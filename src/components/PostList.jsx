import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 5px solid #1976d2;
`;

const Title = styled.h3`
  margin: 0;
  color: #1a237e;
`;

const Meta = styled.p`
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #555;
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

const PdfLink = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  background-color: #e3f2fd;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: #0d47a1;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #bbdefb;
  }
`;

export default function PostList({ currentUser }) {
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("school_posts") || "[]");

    const rolePosts = posts
      .filter((post) => post.audience.includes(currentUser.role))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setVisiblePosts(rolePosts);
  }, [currentUser]);

  return (
    <Container>
      <Heading>
        📢 Posts for{" "}
        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
      </Heading>

      {visiblePosts.length === 0 ? (
        <p>No posts to show.</p>
      ) : (
        visiblePosts.map((post) => (
          <Card key={post.id}>
            <Title>{post.title}</Title>
            <Meta>
              <strong>By:</strong> {post.authorName} ({post.authorRole})
            </Meta>
            <Meta>
              <strong>Subject:</strong> {post.subject || "N/A"} &nbsp; | &nbsp;
              <strong>Class:</strong> {post.className || "N/A"}
            </Meta>
            <Meta>
              <strong>Date:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </Meta>
            <Content>{post.content}</Content>
            {post.imageUrl && <Image src={post.imageUrl} alt="post" />}
            {post.pdfUrl && (
              <PdfLink
                href={post.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={`post-${post.id}.pdf`}
              >
                📄 View PDF Attachment
              </PdfLink>
            )}
          </Card>
        ))
      )}
    </Container>
  );
}
