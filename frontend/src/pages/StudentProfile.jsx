import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

export default function StudentProfile() {

  const { rollNo } = useParams();

  const location = useLocation();

  const [student, setStudent] = useState(null);

  const [exams, setExams] = useState([]);

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students/${rollNo}`
      );

      setStudent(res.data);

      const examRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/exams/${res.data._id}`
      );

      setExams(Array.isArray(examRes.data) ? examRes.data : []);

    } catch (err) {

      console.error("Failed to fetch student:", err);

    }

  };

  if (!student) {

    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* Glow Background */}

      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full"></div>

      {/* Navbar */}

      <nav className="relative z-20 px-6 md:px-12 pt-6">

        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl px-8 py-5 flex items-center justify-between shadow-2xl">

          {/* Logo */}

          <div>

            <h1 className="text-2xl font-black tracking-wide text-white">
              SEMICOLON
            </h1>

            <p className="text-xs text-gray-400 tracking-[4px]">
              EXAM SYSTEM
            </p>

          </div>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-4">

            <Link
              to="/"
              className={`px-5 py-3 rounded-2xl font-semibold transition duration-300

              ${
                location.pathname === "/"

                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"

                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
              `}
            >
              Home
            </Link>

            <Link
              to="/students"
              className={`px-5 py-3 rounded-2xl font-semibold transition duration-300

              ${
                location.pathname === "/students"

                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"

                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
              `}
            >
              Students
            </Link>

            <Link
              to="/upload"
              className={`px-5 py-3 rounded-2xl font-semibold transition duration-300

              ${
                location.pathname === "/upload"

                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"

                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
              `}
            >
              Upload
            </Link>

          </div>

          {/* Dashboard */}

          <Link
            to="/students"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >

            Dashboard

          </Link>

        </div>

      </nav>

      {/* Main Content */}

      <div className="relative z-10 max-w-7xl mx-auto pt-36 p-8">

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Student Card */}

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

            {/* Avatar */}

            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-5xl font-black shadow-xl">

              {student.name.charAt(0)}

            </div>

            <h1 className="text-4xl font-black mt-6">
              {student.name}
            </h1>

            <p className="text-blue-300 mt-2 text-lg">
              Roll No: {student.rollNo}
            </p>

            {/* Info */}

            <div className="mt-8 space-y-5">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                <p className="text-gray-400 text-sm">
                  Email
                </p>

                <p className="mt-2 text-lg break-words">
                  {student.email}
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                <p className="text-gray-400 text-sm">
                  Phone Number
                </p>

                <p className="mt-2 text-lg">
                  {student.phone}
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                <p className="text-gray-400 text-sm">
                  Parent Phone
                </p>

                <p className="mt-2 text-lg">
                  {student.parentPhone}
                </p>

              </div>

            </div>

          </div>

          {/* Exams Section */}

          <div className="lg:col-span-2">

            {/* Heading */}

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-5xl font-black">
                  Exams
                </h2>

                <p className="text-gray-400 mt-2">
                  Uploaded reports and OMR sheets
                </p>

              </div>

            </div>

            {/* Exam Cards */}

            {exams.length === 0 ? (

              <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 text-center">

                <h2 className="text-2xl font-bold">
                  No Exams Uploaded
                </h2>

              </div>

            ) : (

              <div className="space-y-6">

                {exams.map((exam) => (

                  <div
                    key={exam._id}
                    className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-xl"
                  >

                    {/* Top */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                      <div>

                        <h2 className="text-3xl font-bold">
                          {exam.examName}
                        </h2>

                        <p className="text-gray-400 mt-2">
                          Uploaded Exam Data
                        </p>

                      </div>

                      {/* Score */}

                      <div className="flex gap-4">

                        <div className="bg-blue-500/20 border border-blue-400/20 px-6 py-4 rounded-2xl">

                          <p className="text-sm text-gray-300">
                            Score
                          </p>

                          <h3 className="text-3xl font-black mt-1">
                            {exam.score}
                          </h3>

                        </div>

                        <div className="bg-cyan-500/20 border border-cyan-400/20 px-6 py-4 rounded-2xl">

                          <p className="text-sm text-gray-300">
                            Rank
                          </p>

                          <h3 className="text-3xl font-black mt-1">
                            {exam.rank}
                          </h3>

                        </div>

                      </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap gap-4 mt-8">

                      {exam.omrFile && (

                        <a
                          href={`${import.meta.env.VITE_API_URL}/uploads/${exam.omrFile}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                        >
                          View OMR
                        </a>

                      )}

                      {exam.reportCard && (

                        <a
                          href={`${import.meta.env.VITE_API_URL}/uploads/${exam.reportCard}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white/10 border border-white/10 px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition"
                        >
                          View Report Card
                        </a>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}