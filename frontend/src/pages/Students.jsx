import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Students() {

  const location = useLocation();

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`
      );

      setStudents(
  Array.isArray(res.data)
    ? res.data
    : []
);

    } catch (err) {

      console.error("Failed to fetch student:", err);

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* Background Glow */}

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

          <button

  onClick={() => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  }}

  className="
    bg-red-500
    text-white
    px-6
    py-3
    rounded-2xl
    font-semibold
    hover:scale-105
    transition
    duration-300
    shadow-lg
  "
>

  Logout

</button>

        </div>

      </nav>

      {/* Main Content */}

      <div className="relative z-10 pt-36 p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black tracking-tight">
              Students
            </h1>

            <p className="text-gray-400 mt-2">
              Manage registered students
            </p>

          </div>

          {/* Search */}

          <input
            type="text"
            placeholder="Search by Roll Number"
            className="bg-white/10 border border-white/10 backdrop-blur-md px-5 py-4 rounded-2xl outline-none w-full md:w-[350px] placeholder:text-gray-400 focus:border-blue-400"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Student Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {students
            .filter((student) =>
              student?.rollNo?.includes(search)
            )
            .map((student) => (

              <div
                key={student._id}
                className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition duration-300 shadow-2xl"
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {student.name}
                    </h2>

                    <p className="text-blue-300 mt-1">
                      #{student.rollNo}
                    </p>

                  </div>

                  {/* Avatar */}

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold shadow-lg">

                    {student.name.charAt(0)}

                  </div>

                </div>

                {/* Details */}

                <div className="mt-6 space-y-3 text-gray-300">

                  <p className="break-words">
                    📧 {student.email}
                  </p>

                  <p>
                    📱 {student.phone}
                  </p>

                  <p>
                    👨‍👩‍👦 Parent: {student.parentPhone}
                  </p>

                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">

                  <Link
                    to={`/student/${student.rollNo}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-center py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                  >
                    View Profile
                  </Link>

                  <button
                    className="bg-white/10 border border-white/10 px-5 rounded-2xl hover:bg-white/20 transition"
                  >
                    ⋮
                  </button>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

  );

}