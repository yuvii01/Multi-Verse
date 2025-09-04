import { Container } from "../../styles/Styles.js"
import { useState } from "react";
import styled from "styled-components";
import { dummyLeaveRequests } from "../../assets/LeaveRequests.js";



const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const RequestCard = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const InfoGroup = styled.div`
  flex: 1;
  min-width: 250px;

  p {
    margin: 4px 0;
    font-size: 15px;
  }

  span.status {
    font-weight: 500;
    &.approved {
      color: #2e7d32;
    }
    &.rejected {
      color: #c62828;
    }
    &.pending {
      color: #f9a825;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #ffffff;
  background-color: ${(props) => (props.approve ? "#388e3c" : "#d32f2f")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.approve ? "#2e7d32" : "#c62828")};
  }
`;


const LeaveRequest = () => {
    const [requests, setRequests] = useState(dummyLeaveRequests);

    const handleAction = (id, action) => {
        const updated = requests.map((req) =>
            req.id === id ? { ...req, status: action } : req
        );
        setRequests(updated);
    };

    return (
        <Container>
            <Title>Leave Requests</Title>

            <div style={{height:"70vh",overflowY:"auto"}}>


                {requests.map((req) => (
                    <RequestCard key={req.id}>
                        <InfoGroup>
                            <p><strong>Name:</strong> {req.staffName}</p>
                            <p><strong>ID:</strong> {req.staffId}</p>
                            <p><strong>Reason:</strong> {req.reason}</p>
                            <p><strong>Date:</strong> {req.requestDate}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`status ${req.status.toLowerCase()}`}>
                                    {req.status}
                                </span>
                            </p>
                        </InfoGroup>

                        {req.status === "Pending" && (
                            <ButtonGroup>
                                <ActionButton approve onClick={() => handleAction(req.id, "Approved")}>
                                    Approve
                                </ActionButton>
                                <ActionButton onClick={() => handleAction(req.id, "Rejected")}>
                                    Reject
                                </ActionButton>
                            </ButtonGroup>
                        )}
                    </RequestCard>
                ))}
            </div>
        </Container>
    );
};
export default LeaveRequest
