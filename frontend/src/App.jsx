import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import UploadExam from "./pages/UploadExam";
import Login from "./pages/Login";
import AnswerKeyUpload from "./pages/AnswerKeyUpload";
import BulkResultUpload from "./pages/BulkResultUpload";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Register />} />

        <Route path="/students" element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        } />

        <Route path="/student/:rollNo" element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        } />

        <Route path="/upload" element={
          <ProtectedRoute>
            <UploadExam />
          </ProtectedRoute>
          } />

        <Route path="/answer-key" element={
          <ProtectedRoute>
            <AnswerKeyUpload />
          </ProtectedRoute>
        } />

        <Route path="/bulk-results" element={
          <ProtectedRoute>
            <BulkResultUpload />
          </ProtectedRoute>
        } />

      </Routes>

    </BrowserRouter>
  );
}

export default App;