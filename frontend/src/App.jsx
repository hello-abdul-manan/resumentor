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
        formData,
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
    <div style={styles.container}>
      <h1>Resumind</h1>
      <p>AI Resume Analyzer</p>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={styles.button}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {result && (
        <div style={styles.result}>
          <h2>Skills</h2>
          <ul>
            {result.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2>Score: {result.analysis.score}</h2>

          <h3>Strengths</h3>
          <ul>
            {result.analysis.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {result.analysis.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Missing Skills</h3>
          <ul>
            {result.analysis.missing_skills.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>
          <ul>
            {result.analysis.suggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  result: {
    marginTop: "30px",
    textAlign: "left",
  },
};

export default App;
