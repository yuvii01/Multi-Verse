import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../pages/Timeline";
import Library from "../pages/Library";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
