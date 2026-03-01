const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));

    if (data.choices && data.choices[0]) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from Groq', details: data });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running!'));
