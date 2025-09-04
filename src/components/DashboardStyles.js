import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  background-color: #fef3e7;
  height: 100vh;
  color: #333;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: #f9d9b7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ddd;

  h2 {
    font-size: 24px;
    margin-bottom: 1rem;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 10px 0;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: #777;
  }

  ul {
    list-style: none;
    margin-top: 2rem;
    padding: 0;
    width: 100%;

    li {
      padding: 10px 15px;
      margin-bottom: 10px;
      background: #f3caa3;
      border-radius: 12px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: #e0b88f;
      }
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 30px;
`;

export const Card = styled.div`
  background: #fff7ec;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  h4 {
    margin: 0;
    color: #777;
  }

  h2 {
    color: #28a745;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

export const Section = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
`;

export const ScheduleCard = styled.div`
  background: #eae3fd;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  color: #4a4a4a;

  span {
    background: #8c7ae6;
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
  }

  h4 {
    margin: 10px 0 5px;
  }

  p {
    font-size: 13px;
    color: #666;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 10px 18px;
  background: #8c7ae6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #6c5ce7;
  }
`;
