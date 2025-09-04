import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Input, Select, SelectWrapper, UtilityContainer } from "../../styles/Styles";
import useDebounce from "../../utils/Debounce";
import { dummyDisciplinaryrecords } from "../../assets/DisciplinaryRecords";

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const RecordCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
`;

const Field = styled.p`
  font-size: 15px;
  margin: 6px 0;
  min-width: 230px;

  span {
    font-weight: 600;
  }

  .status {
    &.Resolved {
      color: green;
    }
    &.Pending {
      color: #f9a825;
    }
  }
`;

const DisciplinaryRecord = () => {
    const [records, setRecords] = useState(dummyDisciplinaryrecords);
    const [filteredRecords, setFilteredRecords] = useState(dummyDisciplinaryrecords);
    const [input, setInput] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
    const debouncedInput = useDebounce(input, 300);

    useEffect(() => {
        let filtered = dummyDisciplinaryrecords;

        if (debouncedInput.trim() !== "") {
            filtered = filtered.filter((rec) =>
                rec.studentName.toLowerCase().includes(debouncedInput.toLowerCase())
            );
        }

        if (selectStatus) {
            filtered = filtered.filter((rec) => rec.status === selectStatus);
        }

        setFilteredRecords(filtered);
    }, [debouncedInput, selectStatus]);

    return (
        <Container>
            <UtilityContainer>
                <Input
                    type="text"
                    placeholder="Search by student name"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <SelectWrapper>
                    <Select
                        id="status-select"
                        value={selectStatus}
                        onChange={(e) => setSelectStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                    </Select>
                </SelectWrapper>
            </UtilityContainer>

            <Title>Disciplinary Records</Title>
            <div style={{ height: "70vh", overflowY: "auto" }}>


                {filteredRecords.map((rec) => (
                    <RecordCard key={rec.id}>
                        <Row>
                            <Field><span>Student Name:</span> {rec.studentName}</Field>
                            <Field><span>Student ID:</span> {rec.studentId}</Field>
                            <Field><span>Class:</span> {rec.classLevel}</Field>
                            <Field><span>Date:</span> {rec.date}</Field>
                        </Row>
                        <Row>
                            <Field><span>Violation:</span> {rec.violation}</Field>
                            <Field><span>Action Taken:</span> {rec.actionTaken}</Field>
                            <Field>
                                <span>Status:</span>{" "}
                                <span className={`status ${rec.status}`}>{rec.status}</span>
                            </Field>
                        </Row>
                    </RecordCard>
                ))}
            </div>
        </Container>
    );
};

export default DisciplinaryRecord;
