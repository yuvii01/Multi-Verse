import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 0.5rem;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  background: #388e3c;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = [
  { time: "09:00 - 10:00", period: 1 },
  { time: "10:00 - 11:00", period: 2 },
  { time: "11:00 - 12:00", period: 3 },
  { time: "12:00 - 01:00", period: 4 },
  { time: "01:00 - 02:00", period: 5 },
  { time: "02:00 - 03:00", period: 6 },
];

// Example initial schedule: [day][period] = { subject, class, teacher }
const initialSchedule = {};
days.forEach((day) => {
  initialSchedule[day] = periods.map((p, idx) =>
    idx === 2 // Example: 3rd period is free on all days
      ? { subject: "", class: "", teacher: "", free: true }
      : { subject: "Math", class: "Class A", teacher: "Mr. Sharma", free: false }
  );
});

export default function ClassScheduleManager() {
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("classSchedule");
    return saved ? JSON.parse(saved) : initialSchedule;
  });

  const [form, setForm] = useState({
    day: days[0],
    period: 1,
    subject: "",
    class: "",
    teacher: "",
  });

  useEffect(() => {
    localStorage.setItem("classSchedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleAdd = () => {
    setSchedule((prev) => {
      const updated = { ...prev };
      updated[form.day][form.period - 1] = {
        subject: form.subject,
        class: form.class,
        teacher: form.teacher,
        free: !form.subject && !form.class && !form.teacher,
      };
      return updated;
    });
    setForm({ ...form, subject: "", class: "", teacher: "" });
  };

  return (
    <ScheduleContainer>
      <h3>Weekly Period-wise Class Schedule</h3>
      <div>
        <select
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
        >
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={form.period}
          onChange={(e) => setForm({ ...form, period: Number(e.target.value) })}
        >
          {periods.map((p) => (
            <option key={p.period} value={p.period}>
              Period {p.period} ({p.time})
            </option>
          ))}
        </select>
        <Input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <Input
          placeholder="Class"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <Input
          placeholder="Teacher"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
        />
        <Button onClick={handleAdd}>Set</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Day / Period</Th>
            {periods.map((p) => (
              <Th key={p.period}>
                {p.time}
                <br />
                (P{p.period})
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <Td><b>{day}</b></Td>
              {schedule[day].map((slot, idx) => (
                <Td
                  key={idx}
                  style={{
                    background: slot.free ? "#f5f5f5" : "#e3f2fd",
                    color: slot.free ? "#888" : "#222",
                  }}
                >
                  {slot.free ? (
                    <span>Free</span>
                  ) : (
                    <>
                      <div><b>Subject:</b> {slot.subject}</div>
                      <div><b>Class:</b> {slot.class}</div>
                      <div><b>Teacher:</b> {slot.teacher}</div>
                    </>
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScheduleContainer>
  );
}