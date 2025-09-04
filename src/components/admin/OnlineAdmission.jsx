import styled from "styled-components";
import { Container } from "../../styles/Styles.js";

const Message = styled.h1`
  text-align: center;
  margin-top: 150px;
  font-size: 28px;
  color: #444;
  font-weight: 600;
`;

const OnlineAdmission = () => {
  return (
    <Container>
      <Message>🎓 Online Admission Feature Coming Soon...</Message>
    </Container>
  );
};

export default OnlineAdmission;
