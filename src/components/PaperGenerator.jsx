import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from 'jspdf';

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 32px 28px 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1565c0;
  }
`;

const Result = styled.div`
  margin-top: 18px;
  background: #fff;
  border-radius: 8px;
  padding: 16px 14px;
  min-height: 48px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Loading = styled.div`
  color: #1976d2;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  min-height: 32px;
`;

const DownloadBtn = styled.button`
  margin-top: 16px;
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  &:hover {
    background: #2e7031;
  }
`;

const PaperGenerator = () => {
  const [exam, setExam] = useState('jee mains');
  const [subject, setSubject] = useState('physics');
  const [numQuestions, setNumQuestions] = useState(5);
  const [customLoading, setCustomLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const processResponse1 = (response) => {
    setResultData(response);
  };
const onSent5 = async (exam, sub, num) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (exam !== undefined) {
      response = await run5(exam, sub, num);
      setRecentPrompt(exam + " " + sub + " " + num);
    } else {
      setPreviousPrompt(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run5(input);
    }

    processResponse1(response);
    setLoading(false);
    setInput("");
  };
async function run5(exam, sub, num) {
    const papergene = `
Generate a school exam paper for ${exam} level in the subject of ${sub}. Include ${num} questions suitable for class ${exam}, covering a mix of MCQs, short and long answer formats. Clearly number each question and skip a line between them. Use plain text formatting only. Do not include answers.
`;

    const apiKey = "AIzaSyCQwPUode3Z9u51LVqSKr0FpsIN4FNfdvA";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };

    const fullPrompt = papergene;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(fullPrompt);
    return result.response.text();
  }

  // const { onSent5, loading, resultData } = useContext(Context);

  const resultRef = useRef();




















  // Custom loading sequence
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResult(false);
    setCustomLoading(true);
    setLoadingStage(1);

    setTimeout(() => setLoadingStage(2), 6000); // After 6s
    setTimeout(() => setLoadingStage(3), 11000); // After 11s
    setTimeout(() => {
      setCustomLoading(false);
      setShowResult(true);
      onSent5(exam, subject, numQuestions);
    }, 16000); // After 16s
  };

  const paperOptions = [
  { value: "class 6", label: "Class 6" },
  { value: "class 7", label: "Class 7" },
  { value: "class 8", label: "Class 8" },
  { value: "class 9", label: "Class 9" },
  { value: "class 10", label: "Class 10" },
];

    


  const subjectOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "social science", label: "Social Science" },
  { value: "computer", label: "Computer" },
  { value: "general knowledge", label: "General Knowledge" },
  { value: "moral science", label: "Moral Science" },
  { value: "all", label: "All Subjects" },
];

  // Loading message logic
  let loadingMessage = '';
  if (customLoading) {
    if (loadingStage === 1) loadingMessage = 'Thinking...';
    else if (loadingStage === 2) loadingMessage = 'Generating question paper...';
    else if (loadingStage === 3) loadingMessage = 'Finalising...';
  }

  // Improved PDF download: fit content to A4, avoid cut-off
  const handleDownloadPDF = () => {
    if (!resultData) return;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    const margin = 40;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    let y = margin;

    // Add heading
    pdf.setFontSize(16);
    pdf.text(
      `${exam.toUpperCase()} - ${subject.toUpperCase()} (${numQuestions} Questions)`,
      margin,
      y
    );
    y += 30;

    // Parse HTML and extract questions as plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = resultData;

    let lines = [];
    tempDiv.querySelectorAll('p, li, div').forEach((el) => {
      const text = el.innerText.trim();
      if (text) lines.push(text);
    });

    if (lines.length === 0) {
      lines = [tempDiv.innerText.trim()];
    }

    pdf.setFontSize(12);
    lines.forEach((line, idx) => {
      const split = pdf.splitTextToSize(line, pageWidth);
      split.forEach((txt) => {
        if (y > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(txt, margin, y);
        y += 20;
      });
      y += 5;
    });

    pdf.save(`${exam}_${subject}_paper.pdf`);
  };

  return (
    <Container>
      <Title>Exam Paper Generator</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="exam">Type of Paper:</Label>
          <Select
            id="exam"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            {paperOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="subject">Subject:</Label>
          <Select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="numQuestions">Number of Questions:</Label>
          <Select
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </Select>
        </Field>
        <Button type="submit" disabled={customLoading}>
          Generate Paper
        </Button>
      </Form>
      <Result ref={resultRef}>
        {customLoading ? (
          <Loading>{loadingMessage}</Loading>
        ) : showResult && loading ? (
          <Loading>Thinking...</Loading>
        ) : showResult && resultData ? (
          <Loading>Paper generated! You can now download the PDF.</Loading>
        ) : null}
      </Result>
      {showResult && resultData && !loading && (
        <DownloadBtn onClick={handleDownloadPDF}>
          Download PDF
        </DownloadBtn>
      )}
    </Container>
  );
};

export default PaperGenerator;