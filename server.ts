import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      ai = new GoogleGenAI({
        apiKey: apiKey || "MOCK_KEY",
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
  });

  // API Gemini Health Chatbot Route
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        res.json({
          text: "আসসালামু আলাইকুম! আমি আপনার টিকেট কার্ড এআই স্বাস্থ্য সহকারী (Tika Card AI Health Assistant)। দুঃখিত, বর্তমানে এই প্ল্যাটফর্মে 'GEMINI_API_KEY' কনফিগার করা নেই। অনুগ্রহ করে আপনার এআই স্টুডিওর **Settings > Secrets** প্যানেলে একটি সক্রিয় API Key যুক্ত করুন।\n\nতবে সাধারণ তথ্য অনুযায়ী, শিশুদের টিকা দেওয়া এবং ডিজিটাল টিকা কার্ড তৈরি করা অত্যন্ত সুবিধাজনক। আপনি নিচে কার্ড জেনারেটর ব্যবহার করে এখনই আপনার নিজস্ব টিকা আইডি কার্ড তৈরি করে নিতে পারেন!"
        });
        return;
      }

      const client = getGeminiClient();

      const systemInstruction = 
        `You are the official "TIKA CARD AI Health Assistant" (এআই স্বাস্থ্য সহকারী) of Bangladesh's National Digital Health Platform.
        Your goal is to answer queries about vaccines, health tips, immunizations, and Tika Card services in Bangladesh.
        Respond enthusiastically and professionally. If the user asks in Bengali, reply in polite, supportive Bengali (using 'আপনি' to address them). If they ask in English, reply in English.
        Ensure your advice is scientifically sound but always advise consulting a qualified doctor or clinic for medical decisions.
        Keep responses concise, scannable, and formatted nicely in Markdown. No general assistant fluff; keep focused on health & vaccines in Bangladesh.`;

      // Build context history
      let promptText = "";
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          promptText += `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}\n`;
        });
      }
      promptText += `User: ${message}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in /api/gemini/chat:", error);
      res.status(500).json({ error: error.message || "Failed to generate health advice" });
    }
  });

  // Hot module replacement or static hosting
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TIKA CARD Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
