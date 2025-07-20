🌟 Semantic GitHub Copilot

Semantic GitHub Copilot is an 🚀 AI-powered tool that transforms your project ideas into complete, functional codebases. Powered by the Groq API (LLaMA-3.3-70B), it generates project structures from natural language prompts and displays them in a real-time live preview using Sandpack. Whether you’re building a todo app, an e-commerce platform, or a full-stack notes app, this tool delivers ready-to-use React/TypeScript code with a modern, interactive interface. 🎨
🎉 Features

🧠 AI-Driven Project Generation: Generate full project structures with source code, configs, and dependencies using natural language prompts via the Groq API.
📺 Live Preview with Sandpack: See your project in action instantly with an in-browser Sandpack environment.
📂 Dynamic File Structure: Converts AI-generated file trees into Sandpack-compatible formats for seamless rendering.
⚡️ TypeScript & React Ready: Produces modern React apps with TypeScript, complete with tsconfig.json and package.json.
💡 Example Prompts: Try pre-built prompts like “Build a todo app with React and Tailwind” for quick prototyping.
🎨 Modern UI: Built with Tailwind CSS and Shadcn UI for a sleek, developer-friendly experience.
🛠️ Robust Error Handling: Clear feedback for API issues, missing keys, or invalid structures.

🛠️ Prerequisites

Node.js: v18 or higher
npm: v9 or higher
Groq API Key: Sign up at Groq Console to get your API key.
Browser: Chrome, Firefox, or Edge with JavaScript enabled
GitHub Copilot (optional): Enhances development with semantic suggestions (requires a subscription).

🚀 Installation

Clone the Repository 📂:
git clone https://github.com/allenbaby/Semantic-GitHub-Copilot.git
cd Semantic-GitHub-Copilot


Install Dependencies ⚙️:
npm install


Set Up Environment Variables 🔑:

Create a .env file in the project root.
Add your Groq API key:VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




(Optional) Configure GitHub Copilot 🤖:

Install the GitHub Copilot extension in your IDE (e.g., VS Code).
Activate your Copilot subscription at GitHub Copilot Settings.



🎮 Usage

Start the Development Server 🌐:
npm run dev

Open http://localhost:5173 (or the port shown) in your browser.

Enter a Project Description ✍️:

Use the textarea to describe your project (e.g., “Create a full-stack e-commerce app with React, Node, and MongoDB”).
Or click an example prompt like “Build a todo app with Reactjs with ultra modern UI” to populate the input.
Hit Generate Project Structure to call the Groq API.


Explore the File Structure 📁:

View the generated file tree (via FileTreeViewer) with source files, configs, and README.md.
Edit files directly to update the live preview.


View the Live Preview 🖥️:

The AppPreview component renders the project in a Sandpack-powered iframe.
See real-time updates as you modify the generated code.



📂 Project Structure
├── public/                  # Static assets
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── PromptInput.tsx  # Project description input
│   │   ├── AppPreview.tsx   # Sandpack live preview
│   │   └── FileTreeViewer.tsx # File structure display
│   ├── api.ts               # Groq API integration
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file

📦 Dependencies



Package
Version
Purpose



react
^18.3.1
Core React library


react-dom
^18.3.1
React DOM rendering


@codesandbox/sandpack-react
^2.14.0
Live preview environment


@types/react
^18.3.11
TypeScript types for React


@types/react-dom
^18.3.0
TypeScript types for React DOM


typescript
^5.6.2
TypeScript compiler


lucide-react
^0.453.0
Icons for UI


shadcn-ui
latest
UI components


vite
^5.4.8
Development server (dev)


@vitejs/plugin-react
^4.3.2
React plugin for Vite


Install dependencies:
npm install react@18.3.1 react-dom@18.3.1 @codesandbox/sandpack-react@2.14.0 @types/react@18.3.11 @types/react-dom@18.3.0 typescript@5.6.2 lucide-react@0.453.0 shadcn-ui vite@5.4.8 @vitejs/plugin-react@4.3.2

⚙️ Configuration
Groq API 🔑

The app uses the llama-3.3-70b-versatile model via the Groq API.
Set VITE_GROQ_API_KEY in .env (preferred) or localStorage (key: groq_api_key).
Ensure the key starts with gsk_ and is valid at Groq Console.

Sandpack 🖼️

The live preview uses @codesandbox/sandpack-react with the react template.
Ensure sandpackFiles includes index.html, src/main.tsx, and tsconfig.json.
Apply this CSS in src/Preview.css to fix preview height:.sp-wrapper,
.sp-layout,
.sp-preview-container {
  height: 100% !important;
}


Import in AppPreview.tsx: import "@/Preview.css";.

Vite ⚡️

Vite powers the dev server. See vite.config.ts:import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});



Groq for AI-powered project generation.
Sandpack for live previews.
Vite for fast development.
React and TypeScript for the frontend.
Shadcn UI for modern UI components.
Lucide for icons.
