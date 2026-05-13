import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function UploadExam() {

  const location = useLocation();

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    examName: "",
    score: "",
    rank: ""
  });

  const [loading, setLoading] = useState(false);

  const [omrFile, setOmrFile] = useState(null);

  const [reportCard, setReportCard] = useState(null);

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

      console.error(
  "Failed to fetch students:",
  err
);

    }

  };

  const handleSubmit = async (e) => {

    setLoading(true);

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("studentId", form.studentId);
      data.append("examName", form.examName);
      data.append("score", form.score);
      data.append("rank", form.rank);

      if (omrFile) {
        data.append("omrFile", omrFile);
      }

      if (reportCard) {
        data.append("reportCard", reportCard);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/exams/upload`,
        data
      );

      toast.success("Files Uploaded Successfully");

      setForm({
        studentId: "",
        examName: "",
        score: "",
        rank: ""
      });

      setOmrFile(null);
      setReportCard(null);

    } catch (err) {

      console.error(
  "Failed to upload exam:",
  err
);

      toast.error("Upload Failed");

    } 
    finally {
      setLoading(false);
    }

  };

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

      <div className="relative z-10 max-w-5xl mx-auto pt-36 p-8">

        {/* Heading */}

        <div className="mb-12">

          <h1 className="text-6xl font-black tracking-tight">
            Upload Exam
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Upload OMR sheets and report cards
          </p>

        </div>

        {/* Main Card */}

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[40px] p-10 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Student Select */}

            <div>

              <label className="block mb-3 text-lg font-semibold">
                Select Student
              </label>

              <select
                value={form.studentId}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400"
                onChange={(e) =>
                  setForm({
                    ...form,
                    studentId: e.target.value
                  })
                }
              >

                <option value="">
                  Select Student
                </option>

                {students.map((student) => (

                  <option
                    key={student._id}
                    value={student._id}
                    className="text-black"
                  >

                    {student?.name} ({student?.rollNo})

                  </option>

                ))}

              </select>

            </div>

            {/* Exam Info */}

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Exam Name"
                value={form.examName}
                className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400"
                onChange={(e) =>
                  setForm({
                    ...form,
                    examName: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Score"
                value={form.score}
                className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400"
                onChange={(e) =>
                  setForm({
                    ...form,
                    score: e.target.value
                  })
                }
              />

            </div>

            {/* Rank */}

            <input
              type="text"
              placeholder="Rank"
              value={form.rank}
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400"
              onChange={(e) =>
                setForm({
                  ...form,
                  rank: e.target.value
                })
              }
            />

            {/* Upload Section */}

            <div className="grid md:grid-cols-2 gap-8">

              {/* OMR Upload */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

                <div className="text-5xl mb-5">
                  📄
                </div>

                <h2 className="text-2xl font-bold">
                  Upload OMR
                </h2>

                <p className="text-gray-400 mt-2">
                  PDF or Image File
                </p>

                <input
                  type="file"
                  className="mt-6 block w-full text-sm"
                  onChange={(e) =>
                    setOmrFile(e.target.files[0])
                  }
                />

              </div>

              {/* Report Upload */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

                <div className="text-5xl mb-5">
                  🏆
                </div>

                <h2 className="text-2xl font-bold">
                  Upload Report Card
                </h2>

                <p className="text-gray-400 mt-2">
                  PDF Report File
                </p>

                <input
                  type="file"
                  className="mt-6 block w-full text-sm"
                  onChange={(e) =>
                    setReportCard(e.target.files[0])
                  }
                />

              </div>

            </div>

            {/* Submit */}

            <button

  disabled={loading}

  className={`

    w-full
    bg-gradient-to-r
    from-blue-500
    to-cyan-400
    py-5
    rounded-2xl
    text-xl
    font-bold
    transition

    ${
      loading
        ? "opacity-50 cursor-not-allowed"
        : "hover:opacity-90"
    }

  `}
>

  {
    loading
      ? "Uploading..."
      : "Upload Files"
  }

</button>

          </form>

        </div>

      </div>

    </div>

  );

}