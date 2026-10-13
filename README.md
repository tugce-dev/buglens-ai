# 🐞 BugLens AI

### AI-Powered JavaScript Debugging Assistant

BugLens AI is a full-stack web application that helps developers identify, understand, and fix JavaScript bugs using artificial intelligence.

Built with JavaScript, Node.js, Express.js, and the OpenAI API, BugLens transforms code debugging into an interactive learning experience by providing structured error analysis, suggested fixes, and explanations of the underlying programming concepts.

### 🔗 Live Demo

🚀 **[Try BugLens AI Live](https://buglens-ai-peza.onrender.com/)**

💻 **[View Source Code](https://github.com/tugce-dev/buglens-ai)**

> Note: The application is hosted on Render's free tier. The first request may take a little longer if the server has been inactive.

---

## ✨ Key Features

- **AI-Powered Bug Detection** — Analyzes JavaScript code to identify potential bugs and logical errors.
- **Root Cause Analysis** — Explains why an error occurs and how it affects the code.
- **Error Location Identification** — Suggests the location of detected errors when identifiable.
- **Intelligent Fix Suggestions** — Provides actionable solutions and corrected code.
- **Educational Insights** — Explains the programming concepts behind each bug.
- **Structured Analysis Dashboard** — Organizes results into six clear sections for easy understanding.
- **Interactive Demo** — Includes a one-click example to demonstrate the application's functionality.
- **Responsive Interface** — Provides a consistent experience across desktop and mobile devices.
- **Asynchronous API Communication** — Handles AI requests with loading states and error feedback.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Responsive Web Design

### Backend
- Node.js
- Express.js
- REST-style API endpoint
- CORS Middleware
- Environment Variables

### AI Integration
- OpenAI API
- GPT-4.1 Mini
- Prompt Engineering
- JSON-Based AI Response Processing

### Development Tools
- Visual Studio Code
- Git & GitHub
- npm

---

## 🏗️ Application Architecture

BugLens AI follows a client-server architecture, separating the user interface from server-side AI integration.

```text
                  ┌──────────────────────┐
                  │        User          │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │       Frontend       │
                  │  HTML / CSS / JS     │
                  └──────────┬───────────┘
                             │
                       HTTP POST
                       /api/analyze
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Express Backend    │
                  │       Node.js        │
                  └──────────┬───────────┘
                             │
                       OpenAI API
                             │
                             ▼
                  ┌──────────────────────┐
                  │      AI Model        │
                  │    GPT-4.1 Mini      │
                  └──────────┬───────────┘
                             │
                       AI Response
                             │
                             ▼
                  ┌──────────────────────┐
                  │  Structured JSON     │
                  │     Analysis         │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  Analysis Dashboard  │
                  │     (Frontend)       │
                  └──────────────────────┘
```

### How It Works

1. The user enters a JavaScript code snippet and describes the issue.
2. The frontend sends an asynchronous POST request to the `/api/analyze` endpoint.
3. The Express backend processes the request and communicates with the OpenAI API.
4. The AI model analyzes the submitted code and generates a structured debugging response.
5. The backend parses the AI-generated response and returns JSON to the frontend.
6. The frontend dynamically renders the results in an interactive analysis dashboard.

---

## 🔍 AI Analysis Output

BugLens AI organizes debugging results into six sections:

| Section | Description |
|---------|-------------|
| Error Detected | Identifies the potential bug |
| Why It Happens | Explains the root cause |
| Error Location | Suggests the relevant line number |
| How to Fix It | Provides a recommended solution |
| Corrected Code | Generates an updated code snippet |
| Learning Tip | Explains the underlying programming concept |

The structured output is designed to help developers understand both **what went wrong** and **why the suggested solution works**.

---

## 📸 Screenshots

Screenshots of the application interface and AI analysis dashboard will be added soon.

---

## ⚙️ Installation & Setup

### Prerequisites

Before running the application, make sure you have:

- Node.js installed
- npm installed
- An OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/tugce-dev/buglens-ai.git
```

### 2. Navigate to the Project Directory

```bash
cd buglens-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Security Note:** Never expose your API key in frontend code or commit your `.env` file to GitHub.

### 5. Start the Backend Server

```bash
node --env-file=.env server.js
```

The backend will run at:

```text
http://localhost:3000
```

### 6. Launch the Frontend

Open `index.html` using a local development server, such as the VS Code Live Server extension.

The frontend communicates with the Express backend through the `/api/analyze` endpoint.

---

## 🔐 Security Considerations

- API credentials are stored in environment variables.
- OpenAI API requests are handled server-side.
- Sensitive credentials are excluded from version control using `.gitignore`.
- User-provided code is sent for analysis rather than executed by the application.
- AI-generated analysis is displayed as text instead of being inserted as executable HTML.

---

## 🚀 Future Improvements

- Side-by-side original and corrected code comparison
- Syntax highlighting for JavaScript snippets
- Improved error location accuracy
- Structured output validation
- Automated testing
- Analysis history and saved debugging sessions

---

## 👩‍💻 Author

**Tuğçe Çırak**  
Software Engineer

- [GitHub](https://github.com/tugce-dev)
- [LinkedIn](https://www.linkedin.com/in/tugcecirak/)

---

⭐ If you find this project useful, consider giving it a star!
