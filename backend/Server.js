const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Add CORS support
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Allow requests from frontend

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post('https://api.copilot.microsoft.com/v1/chat', {
      message: userMessage,
    }, {
      headers: {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: response.data.reply || 'No response from API' });
  } catch (error) {
    console.error('Error in API request:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
