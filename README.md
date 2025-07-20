# 🌟 Semantic GitHub Copilot

**Semantic GitHub Copilot** is an 🚀 AI-powered tool that transforms your project ideas into complete, functional codebases.  
Powered by the **Groq API (LLaMA-3.3-70B)**, it generates full React/TypeScript project structures from natural language prompts and renders them live using **Sandpack**.

Whether you're building a todo app, an e-commerce platform, or a full-stack notes app — this tool delivers **production-ready** code with a sleek, modern UI. 🎨

---

## 🎉 Features

- 🧠 **AI-Driven Project Generation**  
  Generate full project structures including source code, configs, and dependencies via the Groq API.

- 📺 **Live Preview with Sandpack**  
  Instantly see the project in action using the embedded Sandpack environment.

- 📂 **Dynamic File Structure**  
  Converts AI-generated file trees into Sandpack-compatible formats for seamless rendering.

- ⚡ **TypeScript & React Ready**  
  Generates modern React apps with TypeScript including `tsconfig.json`, `package.json`, and more.

- 💡 **Example Prompts**  
  Try built-in prompts like _"Build a todo app with React and Tailwind"_ for quick prototyping.

- 🎨 **Modern UI**  
  Built using **Tailwind CSS** and **Shadcn UI** for a developer-first experience.

- 🛠️ **Robust Error Handling**  
  Provides clear feedback for API issues, missing keys, or invalid structures.

---

## 🛠️ Prerequisites

| Requirement      | Version        |
|------------------|----------------|
| Node.js          | v18 or higher  |
| npm              | v9 or higher   |
| Groq API Key     | Required       |
| Browser          | Chrome, Firefox, or Edge |
| GitHub Copilot   | Optional       |

> 🔑 Get your API key from the [Groq Console](https://console.groq.com)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/allenbaby/Semantic-GitHub-Copilot.git
cd Semantic-GitHub-Copilot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. (Optional) Configure GitHub Copilot

- Install the GitHub Copilot extension in your IDE (e.g., VS Code)
- Activate your subscription in GitHub Copilot settings

---

## 🎮 Usage

### Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

### ✍️ Enter a Project Description

- Use the text area to describe your project  
  _(e.g., “Create a full-stack e-commerce app with React, Node, and MongoDB”)_
- Or use a quick prompt like:  
  _“Build a todo app with ReactJS and ultra modern UI”_
- Click **"Generate Project Structure"** to trigger the Groq API

---

### 📁 Explore the File Structure

- Generated tree view using `FileTreeViewer`
- Includes `src/`, `README.md`, config files, etc.
- Files are editable — changes instantly reflect in preview

---

### 🖥️ View the Live Preview

- `AppPreview.tsx` renders the project using Sandpack
- See real-time updates from the generated code

---

## 📂 Project Structure

```
SEMANTIC-GITHUB/
├── node_modules/           # Node.js dependencies (auto-generated)
├── public/                 # Static assets
│   └── index.html          # Main HTML entry point
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries or shared code
│   ├── pages/              # Page components (e.g., for routing)
│   ├── services/           # API or service logic
│   ├── App.css             # Global styles for App component
│   ├── App.tsx             # Main App component
│   ├── index.css           # Global CSS styles
│   ├── main.tsx            # Application entry point
│   └── Preview.css         # Custom styles for Sandpack preview
├── TS_vite-env.d.ts        # TypeScript declaration for Vite environment
├── env                     # Environment variable configuration (e.g., .env file)
├── .gitignore              # Git ignore file
├── bun.lockb               # Bun package lock file
├── components.json         # Shadcn UI components configuration
├── eslint.config.js        # ESLint configuration
├── package-lock.json       # npm package lock file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── README.md               # Readme File
```

---

## 📦 Dependencies

| Package                        | Version     | Purpose                      |
|--------------------------------|-------------|------------------------------|
| react                          | ^18.3.1     | Core React library           |
| react-dom                      | ^18.3.1     | React DOM rendering          |
| @codesandbox/sandpack-react    | ^2.14.0     | Live preview environment     |
| @types/react                   | ^18.3.11    | TypeScript types for React   |
| @types/react-dom              | ^18.3.0     | TypeScript types for ReactDOM|
| typescript                     | ^5.6.2      | TypeScript compiler          |
| lucide-react                   | ^0.453.0    | Icon components              |
| shadcn-ui                      | latest      | Modern UI components         |
| vite                           | ^5.4.8      | Fast development server      |
| @vitejs/plugin-react           | ^4.3.2      | React plugin for Vite        |

---

## ⚙️ Configuration

### 🔑 Groq API

- Uses `llama-3.3-70b-versatile` via Groq API
- Set API key using `.env` or in browser `localStorage`:
  - `.env`: `VITE_GROQ_API_KEY=...`
  - `localStorage.setItem("groq_api_key", "gsk_...")`

```


## 🧠 Tech Stack

- **Groq API** for AI-powered project generation
- **Sandpack** for interactive live previews
- **Vite** for lightning-fast dev server
- **React & TypeScript** for frontend architecture
- **Shadcn UI** for polished components
- **Lucide** for icons

---

## 📬 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/allenbaby/Semantic-GitHub-Copilot/issues).

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---