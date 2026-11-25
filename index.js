
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// NOVA Chat API
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    // Basic NOVA response
    let reply = "Hello! I am NOVA AI.";

    if (/hello|hi/i.test(message)) {
      reply = "Hello! Welcome back. I am NOVA AI.";
    } else if (/உன் பெயர்|your name/i.test(message)) {
      reply = "My name is NOVA AI.";
    } else {
      reply = "நான் NOVA AI. உன்னுடைய message எனக்கு கிடைத்தது!";
    }

    res.json({ reply });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("NOVA AI running on port " + PORT);
});
