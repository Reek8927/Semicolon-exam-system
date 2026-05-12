import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import UploadExam from "./pages/UploadExam";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Register />} />

        <Route path="/students" element={<Students />} />

        <Route path="/student/:rollNo" element={<StudentProfile />} />

        <Route path="/upload" element={<UploadExam />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;