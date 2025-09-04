
import styled from "styled-components";
import { Container } from "../styles/Styles.js";
import { getSession } from "../api/auth.js";



const MapPlaceholder = styled.div`
  height: 300px;
  background: #eef5ff;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ComingSoon = styled.div`
  text-align: center;
  color: #444;
  font-size: 1.25rem;
  font-weight: 500;
  background: linear-gradient(135deg, #d1eaff, #f3f8ff);
  padding: 2rem;
  border-radius: 8px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
    }
  }
`;

export default function TransportTracking() {

  const user = getSession()
  return (
    <Container>
      <h3>School Transport Tracking</h3>
      <p>
        Hello <strong>{user.username}</strong>, track your assigned school bus below.
      </p>
      <MapPlaceholder>
        <ComingSoon>🚌 Live GPS Tracking - Coming Soon...</ComingSoon>
      </MapPlaceholder>
    </Container>
  );
}
