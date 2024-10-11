// server.js
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());  
app.use(express.json()); 

const ELEVENLABS_API_KEY = '38acbbe9c5c6df8460e8c58712d4a708';  
const CHUNK_SIZE = 1024;

app.post('/generate-audio', async (req, res) => {
  const { text } = req.body; 
  const url = "https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE"; 

  const headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": ELEVENLABS_API_KEY
  };

  const data = {
    "text": text || "Default text for audio generation",
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.5
    }
  };

  try {
    const response = await axios.post(url, data, { headers, responseType: 'stream' });

    const outputPath = path.join(__dirname, 'output.mp3');
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      res.json({ message: 'Audio file generated successfully', filePath: '/output.mp3' });
    });

    writer.on('error', (err) => {
      res.status(500).json({ error: 'Error writing the audio file' });
    });
  } catch (error) {
    console.error('Error generating audio:', error.message);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});

app.get('/output.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'output.mp3'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
