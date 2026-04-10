import { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/resume/upload-resume",
        formData
      );

      setResult(response.data);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading resume");
    }
  }

  return (
    <div>
      <h1>ResuMentor</h1>

      <input 
        type="file" 
        accept='.pdf' 
        onChange={handleFileChange}
      />

      <button onClick={handleUpload}>
        Upload & Analyze
      </button>

      {result && (
        <div>
          <h2>Skills</h2>
          <ul>
            {result.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2>Score: {result.analysis.score}</h2>
        </div>
      )}
    </div>
  )
}

export default App