import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null);
  
  return (
    <div>
      <h1>ResuMentor</h1>
      <input type="file" />
    </div>
  )
}

export default App