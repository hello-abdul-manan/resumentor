import { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null);

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

      console.log("Response:", response.data);

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
    </div>
  )
}

export default App