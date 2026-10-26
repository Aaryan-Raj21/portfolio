/**
 * Vercel Serverless Function: /api/chat
 * Secure AI Chatbot Backend Route
 * Author: Aryan Raj (JECRC University)
 * 
 * Note: Never commits or exposes secret API keys.
 * Reads GEMINI_API_KEY or AI_API_KEY from environment variables.
 */

const PORTFOLIO_CONTEXT = `
You are the personal AI Portfolio Assistant for Aryan Raj.
Answer politely, professionally, and concisely in 2-4 sentences based on the verified facts below:

- Identity: Aryan Raj is a Computer Science Engineering student at JECRC University, Jaipur, Rajasthan, India.
- Roles: Aspiring Software Engineer, Full-Stack Web Developer, Problem Solver.
- Technical Skills:
  * Languages: C, C++, Python 3, JavaScript (ES6+)
  * Web Development: HTML5, CSS3, React.js, MERN stack fundamentals, REST APIs
  * Core CS: Data Structures & Algorithms (C++ DSA), OOP, Algorithmic Complexity, Test-Driven Development (TDD)
  * Tools: Git, GitHub, Cursor AI, VS Code, Vercel
- GitHub Profile: https://github.com/Aaryan-Raj21
- Email: aryannraj21@gmail.com
- Completed Projects:
  1. Python Programs Collection (Factorial recursive & iterative, Fibonacci sequence & nth-term, Structure-to-Dictionary with dataclasses) - repo: https://github.com/Aaryan-Raj21/python-program-collection
  2. Messy Python Code Improvement (AI-assisted refactoring to clean, modular, tested PEP-8 statistical analyzer) - repo: https://github.com/Aaryan-Raj21/messy-python-improvement
  3. Bug Fixing Using Cursor AI (Lecture 8 RED->FIX->GREEN debugging of student_utils.py across 9 unit tests: fixed denominator len(marks)-1 to len(marks), boundary >= 40, and >=90 distinction evaluation order) - repo: https://github.com/Aaryan-Raj21/cursor-ai-bug-fixing
  4. Interactive Quiz Application (Lecture 10 Code With AI Quiz web app testing LLM, git commit format, unit test, and CSS concepts) - repo: https://github.com/Aaryan-Raj21/interactive-quiz-app
  5. Book Reading List Application (Lecture 11 Bolt AI + Vercel student app with duplicate detection, 60-char limit, category filter, live summary counters, delete button) - repo: https://github.com/Aaryan-Raj21/reading-list-app, live demo: https://portfolio-aaryan-raj21.vercel.app/reading-list/

Always ground your answers in this information. If asked about something unrelated, politely direct the user to Aryan's projects or skills.
`;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message string is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  // If external AI key is available, call Gemini API
  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: `${PORTFOLIO_CONTEXT}\n\nUser Question: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250
        }
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Gemini API Error:", errorData);
        // Fallback to grounded portfolio reply
        return res.status(200).json({
          reply: getLocalGroundedAnswer(message),
          notice: "Answered via grounded portfolio knowledge."
        });
      }

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) {
        return res.status(200).json({ reply: aiText.trim() });
      }
    } catch (err) {
      console.error("Error contacting external AI:", err);
    }
  }

  // Resilient grounded fallback answer
  const fallbackAnswer = getLocalGroundedAnswer(message);
  return res.status(200).json({
    reply: fallbackAnswer,
    mode: "grounded-knowledge"
  });
};

function getLocalGroundedAnswer(query) {
  const q = query.toLowerCase();

  if (q.includes("who are you") || q.includes("about") || q.includes("introduce") || q.includes("name")) {
    return "I am Aryan Raj's AI Portfolio Assistant! Aryan is a Computer Science Engineering student at JECRC University, Jaipur, with a strong focus on C++ DSA, Python, and full-stack web development.";
  }
  if (q.includes("skill") || q.includes("technolog") || q.includes("language") || q.includes("stack")) {
    return "Aryan specializes in C, C++, Python, JavaScript (ES6+), HTML5, CSS3, React.js, MERN stack fundamentals, Data Structures & Algorithms, Git/GitHub, Cursor AI, and Vercel.";
  }
  if (q.includes("python") || q.includes("factorial") || q.includes("fibonacci") || q.includes("structure")) {
    return "Aryan's Python Programs Collection includes iterative and recursive Factorial calculation, dynamic Fibonacci sequence generation, and Structure-to-Dictionary serialization using dataclasses. Explore the repo: https://github.com/Aaryan-Raj21/python-program-collection";
  }
  if (q.includes("bug") || q.includes("cursor") || q.includes("lecture 8") || q.includes("corrected")) {
    return "In the Bug Fixing project (Lecture 8), Aryan used Cursor AI and TDD to resolve three critical bugs: the denominator bug (len(marks)-1 to len(marks)), boundary condition (>=40), and distinction grade priority (>=90 checked first). All 9 unit tests pass!";
  }
  if (q.includes("reading") || q.includes("book") || q.includes("lecture 11")) {
    return "The Reading List App (Lecture 11) is a responsive student application built with Bolt AI and deployed on Vercel. It features duplicate title prevention, a 60-character limit, reading status filtering, item deletion, and summary counters. Live app: https://portfolio-aaryan-raj21.vercel.app/reading-list/";
  }
  if (q.includes("quiz") || q.includes("lecture 10")) {
    return "The Interactive Quiz App (Lecture 10) is a web application with real-time feedback testing concepts in LLM token prediction, Git commit formatting, unit testing, and algorithmic time complexity.";
  }
  if (q.includes("project")) {
    return "Aryan has completed 5 featured projects: 1. Python Programs Collection, 2. Messy Python Code Improvement, 3. Bug Fixing Using Cursor AI, 4. Interactive Quiz App, and 5. Book Reading List App.";
  }
  if (q.includes("github") || q.includes("repo")) {
    return "You can check out all of Aryan's repositories on GitHub at https://github.com/Aaryan-Raj21";
  }

  return "I am Aryan Raj's portfolio assistant. You can ask me about his educational background at JECRC University, technical skills in C++/Python/MERN, or any of his 5 featured projects!";
}
