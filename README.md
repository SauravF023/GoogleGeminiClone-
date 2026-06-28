# 🤖 AI-Powered Google Gemini Clone using React & OpenRouter API

A production-inspired AI assistant built with **React.js** and **OpenRouter API**, featuring **real-time response streaming, multimodal image understanding, voice interaction, conversation memory, and chat export**. The project replicates the core experience of modern AI assistants like Google Gemini while demonstrating scalable React architecture and browser API integration.

---

## ✨ Features

- 💬 Real-time AI response streaming
- 🧠 Context-aware conversation memory
- 🖼️ Image upload & AI image reasoning
- 🎤 Speech-to-Text using Web Speech API
- 🔊 Text-to-Speech using Speech Synthesis API
- 📄 Export chat history as PDF
- 📝 Export chat history as TXT
- 🌙 Dark/Light theme with persistence
- 📱 Responsive UI
- ⚡ React Context API for global state management

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| State Management | React Context API |
| AI Integration | OpenRouter API, OpenAI SDK |
| Browser APIs | Speech Recognition API, Speech Synthesis API, FileReader API, Blob API, LocalStorage |
| Libraries | jsPDF |

---

## 🏗️ Project Architecture

```
User
   │
   ▼
React UI
   │
   ▼
Context API
   │
   ▼
OpenRouter API
   │
   ▼
Streaming AI Response
   │
   ├──────────────► Chat UI
   │
   └──────────────► Speech Output
```

---

## 📂 Folder Structure

```
src
│
├── assets/
├── components/
│   ├── Main/
│   └── Sidebar/
├── config/
│   └── gemini.js
├── context/
│   └── Context.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ How It Works

1. User enters a text prompt, uploads an image, or uses voice input.
2. React Context API manages the global application state.
3. The prompt and conversation history are sent to the OpenRouter API.
4. If an image is uploaded, it is converted into Base64 and included in the request.
5. The AI response is streamed chunk-by-chunk and rendered in real time.
6. The complete response is stored in conversation history.
7. The response is optionally spoken using the Speech Synthesis API.
8. Users can export the conversation as PDF or TXT.

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/gemini-clone.git
```

Navigate into the project

```bash
cd gemini-clone
```

Install dependencies

```bash
npm install
```

Install required packages

```bash
npm install openai jspdf
```

Start the development server

```bash
npm run dev
```

---

## 🔑 OpenRouter API Setup

Create an account on OpenRouter and generate an API key.

Replace the placeholder in `src/config/gemini.js`:

```javascript
apiKey: "YOUR_OPENROUTER_API_KEY"
```

Run the application.

---

## 📌 Core Components

### Main.jsx

- Chat interface
- Voice input
- Image upload
- PDF/TXT export
- AI response rendering

### Sidebar.jsx

- New chat
- Prompt history
- Theme toggle

### Context.jsx

- Global state management
- Conversation history
- Streaming response handling
- Speech synthesis
- AI communication

### gemini.js

- OpenRouter API integration
- Streaming implementation
- Image request handling
- AI response generation

---

## 🌟 Key Functionalities

### AI Response Streaming

Streams responses token-by-token for a ChatGPT-like experience instead of waiting for the complete response.

### Multimodal Input

Supports both text and image prompts by sending Base64 encoded images to the AI model.

### Voice Interaction

Implements Speech Recognition for voice input and Speech Synthesis for spoken AI responses.

### Chat Export

Allows users to download complete conversations as PDF or TXT files.

### Theme Persistence

Stores user theme preferences using LocalStorage for a consistent experience.

---

## 💡 Why OpenRouter API?

OpenRouter provides a unified interface to multiple Large Language Models (LLMs), allowing the application to remain model-agnostic and reducing vendor lock-in. This makes future model upgrades or experimentation possible with minimal code changes.

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

- React Hooks
- Context API
- API Integration
- Streaming APIs
- Browser APIs
- Asynchronous JavaScript
- State Management
- Component-Based Architecture
- Responsive UI Design
- Multimodal AI Integration

---

## 🔮 Future Improvements

- User authentication
- Database-backed chat history
- Multiple AI model selection
- Markdown rendering
- Code syntax highlighting
- File upload support
- Multi-language support
- Conversation search
- Cloud deployment
- PWA support

---

## 📸 Screenshots

> Add screenshots here.

- Home Screen
- AI Conversation
- Image Upload
- Voice Input
- Dark Mode
- Chat Export

---

## 👨‍💻 Author

**Saurav Mishra**

- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ If you found this project useful, consider giving it a Star!
