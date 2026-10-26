# Personal Portfolio Website with API-Based Chatbot Integration

An interactive, responsive personal portfolio website developed by **Aryan Raj** (B.Tech Computer Science Engineering, JECRC University) featuring previous engineering coursework projects, dynamic project search and filtering, dark/light theme switching, and an integrated AI-powered portfolio assistant.

Submitted for **Internal Assessment — Personal Portfolio Project**.

---

## 🌐 Live Website & Links

* **Deployed Portfolio URL:** [https://portfolio-aaryan-raj21.vercel.app](https://portfolio-aaryan-raj21.vercel.app)
* **GitHub Repository:** [https://github.com/Aaryan-Raj21/portfolio](https://github.com/Aaryan-Raj21/portfolio)
* **Developer GitHub Profile:** [@Aaryan-Raj21](https://github.com/Aaryan-Raj21)
* **Contact Email:** [aryannraj21@gmail.com](mailto:aryannraj21@gmail.com)

---

## 🚀 Key Features

### 1. Personalized Portfolio Sections
* **Hero / Home:** Professional profile presentation with real photograph (`pic.jpeg`), status badge, personal introduction, call-to-action buttons, and social links.
* **About Me:** Academic background at JECRC University, technical philosophy, and core focus areas (DSA, MERN, AI-assisted engineering).
* **Skills & Technologies:** Categorized skill badges covering Languages (*C, C++, Python, JavaScript*), Web (*HTML5, CSS3, React.js, MERN*), CS Core (*DSA, OOP, TDD*), and Tools (*Git, GitHub, Cursor AI, Vercel*).
* **Projects Showcase:** Dedicated cards for all five required academic and practical projects.
* **Contact Information:** Direct email link, GitHub link, university location, and contact form with client-side feedback.

### 2. Five Featured Projects Showcased
1. **Python Programs Collection**
   * Foundational implementations of iterative/recursive Factorial, Fibonacci sequence generator, and Structure-to-Dictionary data serialization using Python dataclasses.
   * Repository: [Aaryan-Raj21/python-program-collection](https://github.com/Aaryan-Raj21/python-program-collection)
2. **Messy Python Code Improvement**
   * Refactoring an unorganized, un-modular script into a clean, PEP-8 compliant statistical data analyzer with unit tests using AI guidance.
   * Repository: [Aaryan-Raj21/messy-python-improvement](https://github.com/Aaryan-Raj21/messy-python-improvement)
3. **Bug Fixing Using Cursor AI (Lecture 8)**
   * Systematic identification and elimination of logical bugs (ZeroDivisionError, boundary conditions, grade precedence) using the **RED &rarr; FIX &rarr; GREEN** testing cycle.
   * Repository: [Aaryan-Raj21/cursor-ai-bug-fixing](https://github.com/Aaryan-Raj21/cursor-ai-bug-fixing)
4. **Interactive Quiz Application (Lecture 10)**
   * Dynamic web assessment application evaluating LLMs, Git conventions, unit testing, and algorithm complexity with instant visual answer feedback and scoring.
   * Repository: [Aaryan-Raj21/interactive-quiz-app](https://github.com/Aaryan-Raj21/interactive-quiz-app)
   * Live Demo: [interactive-quiz-app-aaryan-raj21.vercel.app](https://interactive-quiz-app-aaryan-raj21.vercel.app)
5. **Book Reading List Application (Lecture 11)**
   * Responsive student reading list built with Bolt AI and deployed on Vercel. Features case-insensitive duplicate checking, a 60-character length limit, status category filters, and live summary counters.
   * Repository: [Aaryan-Raj21/reading-list-app](https://github.com/Aaryan-Raj21/reading-list-app)
   * Live Demo: [reading-list-app-aaryan-raj21.vercel.app](https://reading-list-app-aaryan-raj21.vercel.app)

### 3. Interactive Functionality
* **Dynamic Project Search & Filter:** 
  * Real-time search bar that filters project cards dynamically as you type (matches name, tech stack, or description keywords such as *"Python"*, *"Quiz"*, *"Book"*, *"AI"*).
  * Category pill buttons (*All*, *Python*, *Quiz*, *Book App*, *AI & Debugging*) with count indicators.
  * Empty state feedback when no search queries match.
* **Light / Dark Mode Toggle:**
  * Toggle button in the navigation bar accessible on both desktop and mobile screens.
  * Preserves user preference in browser `localStorage` across page reloads.

### 4. API-Based AI Portfolio Chatbot
* **Floating Chatbot Widget:** Non-intrusive floating button with "Ask AI" badge opening a modern modal window.
* **Pre-configured Prompt Chips:** One-click questions covering required topics (*"Who are you?"*, *"What are your skills?"*, *"Explain your Python programs"*, *"What was corrected in buggy code?"*, *"How does the reading list work?"*, *"Where is your GitHub?"*).
* **Secure Serverless Architecture:**
  * Uses a Vercel Serverless Function at `/api/chat.js`.
  * Protects API keys using server-side environment variables (`GEMINI_API_KEY`).
  * Never exposes secrets in client-side JavaScript or public repositories.
  * Resilient grounded knowledge base ensures zero-downtime demonstration.

---

## 🛠️ Technologies Used

* **Frontend:** Semantic HTML5, CSS3 (Custom Variables, Flexbox, CSS Grid, Transitions), Vanilla JavaScript (ES6+ DOM manipulation, Fetch API, LocalStorage).
* **Typography:** Google Fonts (*Plus Jakarta Sans* & *Space Grotesk*).
* **Backend / API:** Node.js Vercel Serverless Function (`/api/chat.js`).
* **AI & Debugging:** Cursor AI, Google Gemini API.
* **Deployment & Version Control:** Git, GitHub, Vercel CI/CD.

---

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aaryan-Raj21/portfolio.git
   cd portfolio
   ```

2. **Open the website:**
   * Open `index.html` directly in any web browser (Google Chrome, Edge, Firefox, Safari).
   * Or use a local web server (e.g. VS Code Live Server, Python `python -m http.server 3000`, or `npx serve`).

3. **Optional: Run Serverless Chatbot Locally with an API Key:**
   * Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   * Add your Google Gemini API key to `.env.local`:
     ```env
     GEMINI_API_KEY="your-actual-api-key"
     ```
   * Run using Vercel CLI:
     ```bash
     vercel dev
     ```

---

## 🔒 Security Best Practices

* **No Secret Leaks:** No API keys are written in client-side JavaScript (`script.js`), HTML, or the repository files.
* **Environment Variables:** All sensitive credentials are kept in `.env.local` (ignored via `.gitignore`) and configured securely in the Vercel dashboard.

---

## 👤 Author

* **Aryan Raj**
* **Institution:** JECRC University, Jaipur, Rajasthan
* **Program:** B.Tech in Computer Science & Engineering
* **GitHub:** [@Aaryan-Raj21](https://github.com/Aaryan-Raj21)
* **Email:** [aryannraj21@gmail.com](mailto:aryannraj21@gmail.com)
