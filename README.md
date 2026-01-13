# 🐾 Veterinary Chatbot SDK (MERN Stack)

A plug-and-play, website-integrable **Veterinary Chatbot SDK** built using the **MERN stack**.  
The chatbot answers **generic veterinary questions** and supports a **conversational appointment booking flow**.  
It can be embedded into **any website using a single script tag**, with optional contextual configuration.

---

## ✨ Features

- 📦 **Script-based Chatbot SDK** (single `<script>` integration)
- 🐶 **AI-powered veterinary Q&A**
- 📅 **Conversational appointment booking**
- 💾 **MongoDB persistence** for conversations & appointments
- 🧩 **Session-based chat history**
- 🎨 **Floating chatbot widget UI**
- ⚙️ **Optional context support via SDK config**

---

## 🧱 Tech Stack

### Frontend
- React (JavaScript)
- Vite (SDK bundling)
- Custom Chat Widget UI

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- HuggingFace OpenAI-compatible LLM API

### Hosting
- Render (Backend + static assets)
- MongoDB Atlas (Database)

---

## 📂 Project Structure (Simplified)

Chatbot-SDK/
├── backend/
│ ├── src/
│ │ ├── app.js
│ │ ├── server.js
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── models/
│ │ └── services/
│ ├── public/
│ │ ├── chatbot.js # SDK file
│ │ └── frontend/ # React build
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ └── sdk/embed.jsx # SDK entry
│ ├── vite.config.js
│ └── package.json
│
└── README.md


## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/your-username/vet-chatbot-sdk.git](https://github.com/your-username/vet-chatbot-sdk.git)
cd vet-chatbot-sdk
```

### 2️⃣ Backend Setup
Navigate to directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure Environment: Create a .env file based on .env.example.
Run locally:
```bash
npm run dev
```
Backend URL: http://localhost:5000

### 3️⃣ Frontend Setup (Development)

Navigate to directory:

```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev
```
Frontend URL: http://localhost:5173

### 4️⃣ Build Frontend & SDK for Deployment

Build SDK Script
```bash
npm run build:sdk
```

Generates: frontend/dist-sdk/chatbot.js
Action: Copy this file to backend/public/chatbot.js

Build React Frontend
```bash
npm run build
```
Action: Copy the build output from dist to backend/public/frontend/

### 5️⃣ Deploy on Render

Service Type: Web Service
Root Directory: backend
Build Command: (leave empty)
Start Command: npm start
Env Vars: Add your .env variables in the Render dashboard.


## 🧩 Chatbot SDK Usage

### ✅ Basic Integration
Add this script tag to the `<head>` or `<body>` of any website to load the chatbot.

```html
<script src="[https://your-backend.onrender.com/sdk/chatbot.js](https://your-backend.onrender.com/sdk/chatbot.js)"></script>
```

### ✅ Context-Based Integration (Optional)
To personalize the user experience, you can provide an optional configuration object before the script.

```html
<script>
  window.VetChatbotConfig = {
    userId: "user_123",
    userName: "John Doe",
    petName: "Buddy",
    source: "marketing-website"
  };
</script>
<script src="[https://your-backend.onrender.com/sdk/chatbot.js](https://your-backend.onrender.com/sdk/chatbot.js)"></script>
```

**Note: The chatbot works seamlessly even if no configuration is provided.**


## 🏗️ Architecture Overview

### High-Level Flow

1.  **User Website**: The host site where the SDK is embedded.
2.  **chatbot.js (SDK)**: Injected script that renders the UI and handles communication.
3.  **Express API (Render)**: The backend handling business logic and routing.
4.  **MongoDB Atlas**: Database for persisting sessions and appointments.
5.  **LLM (HuggingFace)**: The brain providing veterinary guidance.



### Data Model

#### **Conversation**
* `sessionId`: Unique identifier for the chat.
* `context`: Stores SDK configuration (user/pet info).
* `messages[]`: Array of user and AI messages.
* `mode`: Tracks state (`CHAT` or `APPOINTMENT`).
* `appointmentData`: Temporary storage for booking flow.

#### **Appointment**
* Linked to a `sessionId`.
* Contains owner and pet details.

## 🔑 Key Decisions & Trade-offs

* **✅ Conversation as Session**: Each MongoDB document represents one session. This simplifies persistence and makes session handling straightforward.
* **✅ SDK via Script Tag (IIFE)**: Using an Immediately Invoked Function Expression allows the bot to be embedded on any website without framework dependencies (React, Vue, etc.).
* **✅ Backend as Source of Truth**: All history is stored in MongoDB, ensuring users don't lose data if they clear browser `localStorage`.

### ⚖️ Trade-offs
* **Message Nesting**: Messages are embedded within the Conversation document. This is simpler for MVP but may require pagination as conversations grow.
* **IP Whitelisting**: Using `0.0.0.0/0` for MongoDB Atlas access to ensure ease of deployment for this assignment.

---

## 📌 Assumptions
* Chatbot provides generic veterinary guidance only; it does not provide clinical diagnoses.
* Users are advised to consult a veterinarian for urgent medical issues.
* Only one chatbot instance is loaded per page.
* Authentication and advanced security are out of scope for this version.

---

## 🔮 Future Improvements
* **Admin Dashboard**: A UI for clinics to manage and view scheduled appointments.
* **Performance**: Implementing pagination for long conversation histories.
* **Security**: Adding User Authentication and account management.
* **Isolation**: Using **Shadow DOM** for the SDK to prevent CSS styling conflicts with host websites.
* **Analytics**: Insights into conversation trends and user intent.
* **DevOps**: Dockerized deployment and comprehensive automated testing.
