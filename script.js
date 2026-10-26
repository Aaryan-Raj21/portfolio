/**
 * Portfolio Interactive Logic & AI Chatbot
 * Author: Aryan Raj (JECRC University)
 * Internal Assessment Implementation
 */

document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================================================
     1. Dynamic Year
     ========================================================================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ==========================================================================
     2. Light / Dark Mode Toggle (Task 3B)
     ========================================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("aryan_portfolio_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply initial theme
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("aryan_portfolio_theme", isDark ? "dark" : "light");
    });
  }

  /* ==========================================================================
     3. Mobile Navigation & Scrollspy
     ========================================================================== */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active section scrollspy
  const sections = ["home", "about", "skills", "projects", "contact"];
  const navLinks = document.querySelectorAll(".site-nav .nav-link");

  function updateActiveNavLink() {
    let currentSection = sections[0];
    const scrollPos = window.scrollY + 140;

    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        currentSection = id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === "#" + currentSection) {
        link.classList.add("is-active");
      } else if (href && href.startsWith("#")) {
        link.classList.remove("is-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================================================
     4. Project Search & Filter (Task 3A)
     ========================================================================== */
  const searchInput = document.getElementById("project-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const filterPills = document.querySelectorAll(".filter-pill");
  const projectCards = document.querySelectorAll(".project-card");
  const noProjectsMsg = document.getElementById("no-projects-found");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  let activeCategory = "all";

  function filterProjects() {
    const searchTerm = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let visibleCount = 0;

    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle("hidden", searchTerm.length === 0);
    }

    projectCards.forEach(function (card) {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const tech = (card.getAttribute("data-tech") || "").toLowerCase();
      const category = (card.getAttribute("data-category") || "").toLowerCase();
      const description = (card.querySelector(".project-description")?.textContent || "").toLowerCase();

      // Category matching
      let matchesCategory = false;
      if (activeCategory === "all") {
        matchesCategory = true;
      } else if (category.includes(activeCategory) || tech.includes(activeCategory)) {
        matchesCategory = true;
      }

      // Keyword matching
      let matchesSearch = true;
      if (searchTerm) {
        matchesSearch =
          title.includes(searchTerm) ||
          tech.includes(searchTerm) ||
          description.includes(searchTerm);
      }

      if (matchesCategory && matchesSearch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (noProjectsMsg) {
      noProjectsMsg.classList.toggle("hidden", visibleCount > 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      searchInput.value = "";
      filterProjects();
      searchInput.focus();
    });
  }

  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-filter") || "all";
      filterProjects();
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      activeCategory = "all";
      filterPills.forEach(p => p.classList.toggle("active", p.getAttribute("data-filter") === "all"));
      filterProjects();
    });
  }

  /* ==========================================================================
     5. AI Chatbot Integration (Task 6)
     ========================================================================== */
  const chatTrigger = document.getElementById("chatbot-trigger");
  const chatModal = document.getElementById("chatbot-modal");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const navChatBtn = document.getElementById("nav-chat-btn");
  const openChatBtns = document.querySelectorAll(".open-chat-btn");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-user-input");
  const chatMessages = document.getElementById("chat-messages");
  const chatErrorBanner = document.getElementById("chat-error-banner");
  const chipButtons = document.querySelectorAll(".chip-btn");

  function openChat() {
    if (chatModal) {
      chatModal.classList.remove("hidden");
      const chatIcon = chatTrigger?.querySelector(".chat-icon");
      const closeIcon = chatTrigger?.querySelector(".close-icon");
      if (chatIcon) chatIcon.classList.add("hidden");
      if (closeIcon) closeIcon.classList.remove("hidden");
      chatInput?.focus();
      scrollChatToBottom();
    }
  }

  function closeChat() {
    if (chatModal) {
      chatModal.classList.add("hidden");
      const chatIcon = chatTrigger?.querySelector(".chat-icon");
      const closeIcon = chatTrigger?.querySelector(".close-icon");
      if (chatIcon) chatIcon.classList.remove("hidden");
      if (closeIcon) closeIcon.classList.add("hidden");
    }
  }

  function toggleChat() {
    if (chatModal?.classList.contains("hidden")) {
      openChat();
    } else {
      closeChat();
    }
  }

  if (chatTrigger) chatTrigger.addEventListener("click", toggleChat);
  if (chatCloseBtn) chatCloseBtn.addEventListener("click", closeChat);
  if (navChatBtn) {
    navChatBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openChat();
    });
  }
  openChatBtns.forEach(btn => btn.addEventListener("click", openChat));

  // Quick Prompt Chips
  chipButtons.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const query = chip.textContent.trim();
      if (chatInput) {
        chatInput.value = query;
        handleUserMessage(query);
      }
    });
  });

  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = (chatInput?.value || "").trim();
      if (query) {
        handleUserMessage(query);
      }
    });
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}-message`;
    const avatar = sender === "bot" ? "🤖" : "👤";

    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">${formatBotMessage(text)}</div>
    `;

    chatMessages?.appendChild(msgDiv);
    scrollChatToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message bot-message typing-indicator-wrapper";
    indicator.id = "chat-typing-indicator";
    indicator.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages?.appendChild(indicator);
    scrollChatToBottom();
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
  }

  function scrollChatToBottom() {
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function formatBotMessage(text) {
    // Basic Markdown parser for line breaks, bolding, and links
    let formatted = text
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return `<p>${formatted}</p>`;
  }

  function showChatError(msg) {
    if (chatErrorBanner) {
      chatErrorBanner.textContent = msg;
      chatErrorBanner.classList.remove("hidden");
      setTimeout(() => {
        chatErrorBanner.classList.add("hidden");
      }, 5000);
    }
  }

  /* Grounded Local Knowledge Base (Guarantees zero-failure demonstration) */
  const portfolioKnowledge = {
    identity: "I am **Aryan Raj**, a Computer Science Engineering student at **JECRC University** in Jaipur, India. I am passionate about software engineering, data structures, and building full-stack web applications.",
    skills: "Aryan's technical skills include:\n• **Programming Languages:** C, C++, Python, JavaScript (ES6+)\n• **Web Development:** HTML5, CSS3, React.js, MERN stack fundamentals, REST APIs\n• **Core CS:** Data Structures & Algorithms (DSA in C++), OOP, Complexity Analysis\n• **Tools:** Git, GitHub, Cursor AI, VS Code, Vercel",
    projects: "Aryan has completed five featured projects:\n1. **Python Programs Collection:** Factorial, Fibonacci, and Struct-to-Dict serialization.\n2. **Messy Python Code Improvement:** AI-assisted refactoring to clean, modular, tested PEP-8 code.\n3. **Bug Fixing Using Cursor AI:** Lecture 8 RED->FIX->GREEN debugging across 9 unit tests.\n4. **Interactive Quiz Application:** Lecture 10 responsive technical quiz app.\n5. **Book Reading List Application:** Lecture 11 Bolt AI + Vercel reading management app.",
    python: "Aryan's **Python Programs Collection** includes:\n• `factorial.py`: Both iterative ($O(n)$) and recursive implementations with defensive error checks.\n• `fibonacci.py`: Dynamic sequence generator and $O(1)$ space $n$-th term calculation.\n• `structure_to_dict.py`: Data mapping using Python `@dataclass` and `asdict`, plus tuple-to-dictionary serialization with JSON formatting.\nRepo: [github.com/Aaryan-Raj21/python-program-collection](https://github.com/Aaryan-Raj21/python-program-collection)",
    buggy: "In the **Bug Fixing Using Cursor AI** project (Lecture 8), Aryan eliminated 3 critical bugs using the **RED -> FIX -> GREEN** cycle:\n1. **Denominator Bug:** Fixed `len(marks) - 1` to `len(marks)` to prevent ZeroDivisionError and incorrect averages.\n2. **Pass Boundary Bug:** Changed strict `mark > 40` to inclusive `mark >= 40`.\n3. **Grade Precedence Bug:** Checked `>= 90` before `>= 60` so distinction scores aren't classified as 'First'.\nAll 9 unit tests pass in `test_student_utils.py`!",
    readingList: "The **Book Reading List Application** (Lecture 11) is a responsive student application built with Bolt AI and deployed on Vercel. Features:\n• Add books with reading status ('Want to Read', 'Reading', 'Finished')\n• Case-insensitive duplicate prevention\n• Strict 60-character title limit\n• Real-time summary counters (Total, Currently Reading, Finished)\n• Dynamic status change & individual delete button\n• Live App: [portfolio-aaryan-raj21.vercel.app/reading-list/](https://portfolio-aaryan-raj21.vercel.app/reading-list/)",
    github: "Aryan Raj's official GitHub profile is **[@Aaryan-Raj21](https://github.com/Aaryan-Raj21)**, where you can find the repositories for all his projects and coursework."
  };

  function getGroundedLocalResponse(query) {
    const q = query.toLowerCase();

    if (q.includes("who are you") || q.includes("about") || q.includes("introduce") || q.includes("name")) {
      return portfolioKnowledge.identity;
    }
    if (q.includes("skill") || q.includes("technolog") || q.includes("language") || q.includes("stack")) {
      return portfolioKnowledge.skills;
    }
    if (q.includes("project") && !q.includes("python") && !q.includes("bug") && !q.includes("quiz") && !q.includes("reading")) {
      return portfolioKnowledge.projects;
    }
    if (q.includes("python") || q.includes("factorial") || q.includes("fibonacci") || q.includes("structure")) {
      return portfolioKnowledge.python;
    }
    if (q.includes("bug") || q.includes("cursor") || q.includes("lecture 8") || q.includes("corrected") || q.includes("red")) {
      return portfolioKnowledge.buggy;
    }
    if (q.includes("reading") || q.includes("book") || q.includes("lecture 11") || q.includes("bolt")) {
      return portfolioKnowledge.readingList;
    }
    if (q.includes("quiz") || q.includes("lecture 10")) {
      return "The **Interactive Quiz Application** is a technical assessment tool developed in Lecture 10. It features 5 core CS questions covering LLMs, Git commit conventions, unit testing, CSS separation, and algorithmic complexity with live score tracking and retry modes.\nRepo: [github.com/Aaryan-Raj21/interactive-quiz-app](https://github.com/Aaryan-Raj21/interactive-quiz-app)";
    }
    if (q.includes("github") || q.includes("repo") || q.includes("profile")) {
      return portfolioKnowledge.github;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
      return "You can reach Aryan directly at **aryannraj21@gmail.com** or check out his GitHub at [github.com/Aaryan-Raj21](https://github.com/Aaryan-Raj21).";
    }

    return `I am familiar with Aryan Raj's portfolio! You can ask me:\n• "Who are you?"\n• "What are your skills?"\n• "What projects have you completed?"\n• "Explain your Python programs"\n• "What was corrected in the buggy code project?"\n• "How does the reading list work?"\n• "Where is your GitHub?"`;
  }

  async function handleUserMessage(userText) {
    if (chatInput) chatInput.value = "";
    appendMessage("user", userText);
    showTypingIndicator();

    try {
      // First attempt to query the secure serverless backend route (/api/chat)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (response.ok) {
        const data = await response.json();
        hideTypingIndicator();
        appendMessage("bot", data.reply || data.response);
        return;
      }
    } catch (err) {
      // Fetch failed (e.g. running from file:// or offline or dev mode without backend)
      console.warn("Serverless API unavailable, utilizing grounded local knowledge base:", err);
    }

    // Graceful fallback to grounded portfolio knowledge engine
    setTimeout(() => {
      hideTypingIndicator();
      const localReply = getGroundedLocalResponse(userText);
      appendMessage("bot", localReply);
    }, 450);
  }

  /* ==========================================================================
     6. Contact Form Validation
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", function () {
      formFeedback.textContent = "Thank you! Opening your email client to send message to Aryan...";
      formFeedback.style.color = "#15803d";
      formFeedback.classList.remove("hidden");
    });
  }
});
