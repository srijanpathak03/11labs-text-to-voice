import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [audioPath, setAudioPath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/generate-audio', { text });
      setAudioPath(response.data.filePath);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  return (
    <div className="App">
      <h1>Text-to-Speech Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text here"
        />
        <button type="submit">Generate Audio</button>
      </form>

      {audioPath && (
        <div>
          <h2>Audio generated successfully!</h2>
          <audio controls src={`http://localhost:5000${audioPath}`} />
        </div>
      )}
    </div>
  );
}

export default App;
