import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    email: "",

    password: ""

  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/admin/login`,

        form

      );

      // =========================
      // SAVE TOKEN
      // =========================

      localStorage.setItem(

        "token",

        res.data.token

      );

      toast.success(
        "Login Successful"
      );

      navigate("/students");

    } catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Glow */}

      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full"></div>

      {/* Card */}

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/10 rounded-[32px] p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-black text-white">

            Admin Login

          </h1>

          <p className="text-gray-400 mt-3">

            Semicolon Exam System

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Admin Email"
            value={form.email}
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-400 focus:border-blue-400"
            onChange={(e) =>
              setForm({

                ...form,

                email: e.target.value

              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-400 focus:border-blue-400"
            onChange={(e) =>
              setForm({

                ...form,

                password: e.target.value

              })
            }
          />

          <button

            disabled={loading}

            className={`

              w-full
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition

              ${
                loading

                  ? "opacity-50 cursor-not-allowed"

                  : "hover:scale-[1.02]"
              }

            `}
          >

            {

              loading

                ? "Logging In..."

                : "Login"

            }

          </button>

        </form>

      </div>

    </div>

  );

}