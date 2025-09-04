import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Input, Select, SelectWrapper, UtilityContainer } from '../../styles/Styles';
import { dummyFeedbacks } from '../../assets/Feedbacks';
import useDebounce from '../../utils/Debounce';

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const FeedbackCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const InfoItem = styled.p`
  font-size: 15px;
  margin: 4px 0;
  span {
    font-weight: 600;
    color: #333;
  }
`;

const Message = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #444;
`;

const FeedbackAndSuggestion = () => {
  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const debouncedInput = useDebounce(input, 300);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  useEffect(() => {
    let filtered = dummyFeedbacks;

    if (debouncedInput.trim() !== "") {
      filtered = filtered.filter((record) =>
        record.name.toLowerCase().includes(debouncedInput.toLowerCase())
      );
    }

    if (selectedRole !== "") {
      filtered = filtered.filter((record) =>
        record.role.toLowerCase() === selectedRole.toLowerCase()
      );
    }

    setFeedbacks(filtered);
  }, [debouncedInput, selectedRole]);

  return (
    <Container>
      <Title>Feedback & Suggestions</Title>

      <UtilityContainer>
        <Input
          type="text"
          placeholder="Search by name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <SelectWrapper>
          <Select
            id="role-select"
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="Parent">Parent</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </Select>
        </SelectWrapper>
      </UtilityContainer>

      {feedbacks.map((fb) => (
        <FeedbackCard key={fb.id}>
          <InfoRow>
            <InfoItem><span>Name:</span> {fb.name}</InfoItem>
            <InfoItem><span>Role:</span> {fb.role}</InfoItem>
            <InfoItem><span>Date:</span> {fb.date}</InfoItem>
          </InfoRow>
          <Message>{fb.message}</Message>
        </FeedbackCard>
      ))}
    </Container>
  );
};

export default FeedbackAndSuggestion;
