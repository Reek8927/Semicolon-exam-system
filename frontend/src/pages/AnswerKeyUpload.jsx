import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function AnswerKeyUpload() {

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

    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6">

      {/* Card */}

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

  );

}