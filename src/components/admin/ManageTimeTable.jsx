import { useRef, useEffect, useState } from "react";
import { Button, Container, TabButton, TabWrapper } from "../../styles/Styles";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { dummyTimeTables } from "../../assets/ClassTimeTable.js";
import { teacherTimeTables } from "../../assets/TeacherTimeTable.js";

const Wrapper = styled.div`
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 10px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  padding: 0.75rem;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ccc;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  appearance: none;
  outline: none;
  transition: border 0.3s ease;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = ["Period1", "Period2", "Period3", "Period4", "Period5", "Period6"];
const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const subjects = ["Math", "Science", "English", "Hindi", "Social Science", "Computer", "Sanskrit"];

const teachers = [
    { id: "T001", name: "Mr. Rajeev Sharma", subject: "Math" },
    { id: "T002", name: "Ms. Anjali Verma", subject: "Science" },
    { id: "T003", name: "Mr. Alok Gupta", subject: "English" },

];
const ManageTimeTable = () => {
    const [activeTab, setActiveTab] = useState("class");

    return (
        <Container>
            <TabWrapper>
                <TabButton active={activeTab === "class"} onClick={() => setActiveTab("class")}>
                    Class
                </TabButton>
                <TabButton active={activeTab === "teacher"} onClick={() => setActiveTab("teacher")}>
                    Teacher
                </TabButton>
            </TabWrapper>

            {activeTab === "teacher" ? <ManageTeacherTimeTable /> : <ManageClassTimeTable />}
        </Container>
    );
};

export default ManageTimeTable;

// -------------------------- CLASS TIMETABLE ----------------------------
const ManageClassTimeTable = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [allTimeTables, setAllTimeTables] = useState(dummyTimeTables); // for whole dataset
    const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isExisting, setIsExisting] = useState(false);

    const handleChange = (day, period, field, value) => {
        setTimeTable((prev) => ({
            ...prev,
            [day]: {
                ...(prev?.[day] || {}),
                [period]: {
                    ...(prev?.[day]?.[period] || {}),
                    [field]: value,
                },
            },
        }));
    };



    const createEmptyTimeTable = () => {
        const table = {};
        days.forEach((day) => {
            table[day] = {};
            periods.forEach((period) => {
                table[day][period] = { subject: "", teacher: "" }; // ✅ Add teacher field
            });
        });
        return table;
    };

    const [timeTable, setTimeTable] = useState(createEmptyTimeTable()); // for selected class

    useEffect(() => {
        if (!selectedClass) return;

        setLoading(true);

        const found = allTimeTables.find((t) => t.class === selectedClass);

        if (found) {
            const baseTable = createEmptyTimeTable();

            Object.entries(found.timetable || {}).forEach(([day, periodsData]) => {
                Object.entries(periodsData).forEach(([period, value]) => {
                    baseTable[day][period] = value;
                });
            });

            setTimeTable(baseTable);
        } else {
            setTimeTable(createEmptyTimeTable());
        }

        setLoading(false);
    }, [selectedClass]); // ✅ Correct dependency



    const handleSubmit = () => {
        const payload = {
            className: selectedClass,
            timeTable,
        };
        console.log("Payload to save:", payload);
        alert("Timetable saved successfully!");
    };


    const downloadPDF = async () => {
        if (!tableRef.current) return;

        const canvas = await html2canvas(tableRef.current);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.setFontSize(20);
        pdf.text(`Class Timetable: ${selectedClass}`, 40, 30);
        pdf.addImage(imgData, "PNG", 20, 50, pdfWidth - 40, pdfHeight);

        pdf.save(`${selectedClass}_Timetable.pdf`);
    };

    return (
        <Wrapper>
            <Heading>Manage Class Timetable</Heading>

            <Label>Select Class</Label>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">-- Choose Class --</option>
                {classes.map((c, idx) => (
                    <option key={idx} value={c}>
                        {c}
                    </option>
                ))}
            </Select>

            {selectedClass && !loading && (
                < >
                    <Table ref={tableRef}>
                        <thead>
                            <tr>
                                <Th>Day</Th>
                                {periods.map((period) => (
                                    <Th key={period}>{period}</Th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day) => (
                                <tr key={day}>
                                    <Td>{day}</Td>
                                    {periods.map((period) => {
                                        const value = timeTable?.[day]?.[period] || {};

                                        return (
                                            <Td key={period}>
                                                <StyledSelect
                                                    value={value.subject || ""}
                                                    onChange={(e) =>
                                                        handleChange(day, period, "subject", e.target.value)
                                                    }
                                                >
                                                    <option value="">{value.subject}</option>
                                                    {subjects.map((subject) => (
                                                        <option key={subject} value={subject}>
                                                            {subject}
                                                        </option>
                                                    ))}
                                                </StyledSelect>
                                                <br />
                                                <StyledSelect
                                                    value={value.teacher || ""}
                                                    onChange={(e) =>
                                                        handleChange(day, period, "teacher", e.target.value)
                                                    }
                                                >
                                                    <option value="">{value.teacher}</option>
                                                    {teachers.map((teacher) => (
                                                        <option key={teacher.id} value={teacher.name}>
                                                            {teacher.name}
                                                        </option>
                                                    ))}
                                                </StyledSelect>
                                            </Td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="flex gap-4 mt-4">
                        <Button onClick={handleSubmit} bg="#007bff">
                            Save Timetable
                        </Button>
                        <Button onClick={downloadPDF} bg="red">
                            Download PDF
                        </Button>
                    </div>
                </>
            )}

            {loading && <p className="mt-4">Loading timetable...</p>}
        </Wrapper>
    );
};


// -------------------------- TEACHER TIMETABLE PLACEHOLDER ----------------------------

const ManageTeacherTimeTable = () => {
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [teacherTimeTable, setTeacherTimeTable] = useState(teacherTimeTables)
    const [timeTable, setTimeTable] = useState({});
    const [loading, setLoading] = useState(false);
    const timetableRef = useRef(null);


    const createEmptyTimeTable = () => {
        const table = {};
        days.forEach((day) => {
            table[day] = {};
            periods.forEach((period) => {
                table[day][period] = { subject: "", class: "" };
            });
        });
        return table;
    };
    useEffect(() => {
        if (!selectedTeacher) return;

        setLoading(true);

        const found = teacherTimeTables.find((t) => t.name === selectedTeacher);

        if (found) {
            const baseTable = createEmptyTimeTable();

            Object.entries(found.timetable || {}).forEach(([day, periodsData]) => {
                Object.entries(periodsData).forEach(([period, value]) => {
                    baseTable[day][period] = value;
                });
            });

            setTimeTable(baseTable);
        } else {
            setTimeTable(createEmptyTimeTable());
        }

        setLoading(false);
    }, [selectedTeacher]);

    const handleChange = (day, period, field, value) => {
        setTimeTable((prev) => ({
            ...prev,
            [day]: {
                ...(prev[day] || {}),
                [period]: {
                    ...(prev[day]?.[period] || {}),
                    [field]: value,
                },
            },
        }));
    };

    const handleSubmit = () => {
        if (!selectedTeacher) return;

        console.log("Updated timetable for:", selectedTeacher, timeTable);
        alert("Timetable updated!");
    };

    const downloadPDF = async () => {
        if (!selectedTeacher) {
            alert("Please select a teacher.");
            return;
        }

        const element = timetableRef.current;

        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2, // better quality
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.text(`Teacher Timetable: ${selectedTeacher}`, 20, 20);
        pdf.addImage(imgData, "PNG", 20, 40, pdfWidth - 40, pdfHeight);
        pdf.save(`${selectedTeacher}_Timetable.pdf`);
    };


    return (
        <Wrapper>
            <Heading>Manage Teacher Timetable</Heading>

            <Label>Select Teacher</Label>
            <Select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                <option value="">-- Choose Teacher --</option>
                {teacherTimeTable.map((t) => (
                    <option key={t.name} value={t.name}>
                        {t.name}
                    </option>
                ))}
            </Select>

            {selectedTeacher && !loading && (
                <>
                    <Table ref={timetableRef}>
                        <thead>
                            <tr>
                                <Th>Day</Th>
                                {periods.map((period) => (
                                    <Th key={period}>{period}</Th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day) => (
                                <tr key={day}>
                                    <Td>{day}</Td>
                                    {periods.map((period) => {
                                        const value = timeTable[day]?.[period] || {};

                                        return (
                                            <Td key={period}>
                                                {/* Show current value (read-only) */}

                                                <StyledSelect
                                                    value={value.subject || ""}
                                                    onChange={(e) =>
                                                        handleChange(day, period, "subject", e.target.value)
                                                    }
                                                >
                                                    <option value="" disabled>--------</option>
                                                    {subjects.map((subject) => (
                                                        <option key={subject} value={subject}>
                                                            {subject}
                                                        </option>
                                                    ))}
                                                </StyledSelect>

                                                <br />


                                                <StyledSelect
                                                    value={value.class || ""}
                                                    onChange={(e) =>
                                                        handleChange(day, period, "class", e.target.value)
                                                    }
                                                >
                                                    <option value="">--------</option>
                                                    {classes.map((cls) => (
                                                        <option key={cls} value={cls}>
                                                            {cls}
                                                        </option>
                                                    ))}
                                                </StyledSelect>
                                            </Td>

                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="flex gap-4 mt-4">
                        <Button onClick={handleSubmit} bg={"#007bff"}>
                            Save Timetable
                        </Button>
                        <Button onClick={downloadPDF} bg={"red"}>
                            Download PDF
                        </Button>
                    </div>
                </>
            )}

            {loading && <p className="mt-4">Loading timetable...</p>}
        </Wrapper>
    );

};