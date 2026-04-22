import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume/upload-resume`,
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error uploading resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            Resumentor
          </h1>
          <p className="text-gray-500 mt-2">AI Resume Analyzer</p>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-600
                       hover:file:bg-indigo-100"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold 
                       hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            
            {/* Score Card */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Score</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-1">
                {result.analysis.score}
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid Sections */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Strengths */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <h3 className="font-semibold text-green-700 mb-2">
                  Strengths
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {result.analysis.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <h3 className="font-semibold text-red-700 mb-2">
                  Weaknesses
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {result.analysis.weaknesses.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <h3 className="font-semibold text-yellow-700 mb-2">
                  Missing Skills
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {result.analysis.missing_skills.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-700 mb-2">
                  Suggestions
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {result.analysis.suggestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
