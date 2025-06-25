// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: userMessage }],
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ message: "❌ No response from Claude." });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenRouter:", error.message);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
