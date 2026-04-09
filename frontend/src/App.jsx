import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  
  const handleUpload = () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    console.log("File ready to upload:", file)
  }

  return (
    <div>
      <h1>ResuMentor</h1>
      <input type="file" accept='.pdf' onChange={handleFileChange}/>
      <button onClick={handleUpload}>Upload & Analyze</button>
    </div>
  )
}

export default App