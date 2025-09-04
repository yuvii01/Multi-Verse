import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? "#007bff" : "#e0e0e0")};
  color: ${({ $active }) => ($active ? "white" : "black")};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#0056b3" : "#c2c2c2")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          $active={page === currentPage} // ✅ FIXED: Use $active
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
