const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many analysis requests. Please try again in 15 minutes."
  }
});

const port = process.env.PORT || 3000;
console.log("API key loaded:", Boolean(process.env.OPENAI_API_KEY));

app.get("/hello", (req, res) => {
  console.log("Someone visited /hello");
  res.send("Hello, from BugLens AI!");
});

app.post("/api/analyze", analyzeLimiter, async (req, res) => {
  const userCode = req.body.code;
  const userDescription = req.body.description;

  console.log("Analyze request received!");


  try {
    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are BugLens AI, a helpful code debugging assistant.

Analyze the following code and identify potential bugs.

Explain:
1. What is wrong?
2. Why does it happen?
3. How can it be fixed?
4. Show the corrected code.
5. What programming concept should the user learn?

If you cannot determine the exact cause, explain what additional information is needed.

Return your analysis as a JSON object with these fields:

error: A short description of the bug.
location: The line number where the bug occurs, if identifiable.
explanation: Explain why the bug happens.
solution: Explain how to fix the bug.
fixedCode: The corrected code.
learningTip: Explain the programming concept behind the bug.

Return only valid JSON, without Markdown code fences.

User's problem:
${userDescription}

User's code:
${userCode}
`,
      }),
    });
    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("OpenAI API Error: ", aiData.error);
      return res.status(502).json({
        message: "Error analyzing code",
      });
    }
    const analysis = aiData.output
      ?.flatMap((item) => item.content ?? [])
      .filter((item) => item.type === "output_text")
      .map((item) => item.text)
      .join("\n");

    if (!analysis) {
      return res.status(502).json({
        message: "AI returned an empty response.",
      });
    }

    const parsedAnalysis = JSON.parse(analysis);
    
    res.json({
      analysis: parsedAnalysis,
      success: true,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
