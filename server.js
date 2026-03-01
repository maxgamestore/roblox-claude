const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.json());

const client = new Anthropic({
  apiKey: 'YOUR_API_KEY_HERE'
});

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: userMessage }]
  });

  res.json({ reply: response.content[0].text });
});

app.listen(3000, () => console.log('Server running!'));