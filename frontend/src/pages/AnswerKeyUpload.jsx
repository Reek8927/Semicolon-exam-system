import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Link,
  useLocation
} from "react-router-dom";

export default function AnswerKeyUpload() {

  const location =
    useLocation();

  const [examName, setExamName] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!file) {

        return toast.error(
          "Select PDF File"
        );

      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "examName",
          examName
        );

        formData.append(
          "file",
          file
        );

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/answer-key/upload`,

          formData

        );

        toast.success(
          "Answer Key Uploaded"
        );

        setExamName("");

        setFile(null);

      } catch (err) {

        console.log(err);

        toast.error(
          "Upload Failed"
        );

      } finally {

        setLoading(false);

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

            <h1 className="text-2xl font-black tracking-wide">

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
              className={`

                px-5
                py-3
                rounded-2xl
                font-semibold
                transition
                duration-300

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
              className={`

                px-5
                py-3
                rounded-2xl
                font-semibold
                transition
                duration-300

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
              className={`

                px-5
                py-3
                rounded-2xl
                font-semibold
                transition
                duration-300

                ${
                  location.pathname === "/upload"

                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"

                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }

              `}
            >

              Upload

            </Link>

            <Link
              to="/answer-key"
              className={`

                px-5
                py-3
                rounded-2xl
                font-semibold
                transition
                duration-300

                ${
                  location.pathname === "/answer-key"

                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"

                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }

              `}
            >

              Answer Key

            </Link>

          </div>

          {/* Logout */}

          <button

            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/login";

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

      <div className="relative z-10 flex items-center justify-center p-6 pt-24">

        <div className="w-full max-w-xl bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-4xl font-black">

              Upload Answer Key

            </h1>

            <p className="text-gray-400 mt-2">

              Send final answer key to students

            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Exam Name */}

            <input
              type="text"
              placeholder="Exam Name"
              value={examName}
              onChange={(e) =>
                setExamName(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white/10
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
                placeholder:text-gray-400
                focus:border-blue-400
              "
            />

            {/* File */}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              className="
                w-full
                bg-white/10
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                file:mr-4
                file:px-4
                file:py-2
                file:border-0
                file:rounded-xl
                file:bg-blue-500
                file:text-white
              "
            />

            {/* Button */}

            <button

              disabled={loading}

              className={`

                w-full
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
                shadow-xl

                ${
                  loading

                    ? "bg-gray-500 cursor-not-allowed"

                    : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-[1.02]"
                }

              `}
            >

              {

                loading

                  ? "Uploading..."

                  : "Upload Answer Key"

              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}