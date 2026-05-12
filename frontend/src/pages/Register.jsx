import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Register() {

  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    parentPhone: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/students/register`,
  form
);

      alert(
        `Student Registered\nRoll No: ${res.data.rollNo}`
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        parentPhone: ""
      });

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen overflow-hidden bg-[#050816] relative text-white">

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-cyan-400/20 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px]"></div>

      </div>

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

          {/* Dashboard Button */}
          <Link
            to="/students"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Dashboard
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <div className="relative z-10 grid lg:grid-cols-2 items-center min-h-[85vh] px-8 md:px-16 gap-12">

        {/* Left Side */}
        <div>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            <p className="text-sm text-gray-300">
              Smart Coaching Management System
            </p>

          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight">

            Manage.
            <br />
            Upload.
            <br />
            Analyze.

          </h1>

          <p className="text-gray-400 mt-8 max-w-xl text-lg leading-relaxed">

            A futuristic student management platform for coaching institutes.

          </p>

        </div>

        {/* Right Side Form */}
        <div className="relative flex items-center justify-center">

          <div className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl rounded-[32px] p-8 relative overflow-hidden">

            <div className="relative z-10">

              <div className="mb-8">

                <p className="text-sm text-gray-400">
                  Registration Portal
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  Add Student
                </h2>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  placeholder="Student Name"
                  value={form.name}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400 transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400 transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400 transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Parent Phone"
                  value={form.parentPhone}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-gray-400 focus:border-blue-400 transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      parentPhone: e.target.value
                    })
                  }
                />

                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-xl">

                  Register Student

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}