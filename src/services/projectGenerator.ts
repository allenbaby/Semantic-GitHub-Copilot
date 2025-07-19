import { FileNode } from "@/components/FileTreeViewer";

// Mock data for demonstration - in a real app, this would call an AI service
export const generateProjectStructure = async (prompt: string): Promise<FileNode[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simple prompt analysis for demonstration
  const isReact = prompt.toLowerCase().includes('react');
  const isNode = prompt.toLowerCase().includes('node');
  const isMongoDB = prompt.toLowerCase().includes('mongo');
  const isAuth = prompt.toLowerCase().includes('auth') || prompt.toLowerCase().includes('login');
  const isFullStack = isReact && isNode;

  if (isFullStack) {
    return generateFullStackStructure(prompt, { isAuth, isMongoDB });
  } else if (isReact) {
    return generateReactStructure(prompt, { isAuth });
  } else if (isNode) {
    return generateNodeStructure(prompt, { isAuth, isMongoDB });
  }

  return generateGenericStructure(prompt);
};

const generateFullStackStructure = (prompt: string, options: { isAuth: boolean; isMongoDB: boolean }): FileNode[] => {
  const structure: FileNode[] = [
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "fullstack-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \\"npm run server:dev\\" \\"npm run client:dev\\"",
    "client:dev": "cd client && npm run dev",
    "server:dev": "cd server && npm run dev",
    "build": "cd client && npm run build && cd ../server && npm run build"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}`,
      language: "json"
    },
    {
      name: "client",
      type: "folder",
      children: [
        {
          name: "package.json",
          type: "file",
          content: `{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "axios": "^1.7.2"${options.isAuth ? ',\n    "@auth0/auth0-react": "^2.2.4"' : ''}
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}`,
          language: "json"
        },
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "App.tsx",
              type: "file",
              content: `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';${options.isAuth ? '\nimport Login from \'./pages/Login\';' : ''}
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />${options.isAuth ? '\n          <Route path="/login" element={<Login />} />' : ''}
        </Routes>
      </div>
    </Router>
  );
}

export default App;`,
              language: "typescript"
            },
            {
              name: "pages",
              type: "folder",
              children: [
                {
                  name: "Home.tsx",
                  type: "file",
                  content: `import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Your App</h1>
      <p>This is the home page of your full-stack application.</p>
    </div>
  );
};

export default Home;`,
                  language: "typescript"
                },
                {
                  name: "Dashboard.tsx",
                  type: "file",
                  content: `import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DashboardData {
  message: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
};

export default Dashboard;`,
                  language: "typescript"
                }
              ]
            },
            ...(options.isAuth ? [{
              name: "components",
              type: "folder" as const,
              children: [
                {
                  name: "ProtectedRoute.tsx",
                  type: "file" as const,
                  content: `import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated 
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;`,
                  language: "typescript"
                }
              ]
            }] : [])
          ]
        }
      ]
    },
    {
      name: "server",
      type: "folder",
      children: [
        {
          name: "package.json",
          type: "file",
          content: `{
  "name": "server",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"${options.isMongoDB ? ',\n    "mongoose": "^7.5.0"' : ''}${options.isAuth ? ',\n    "jsonwebtoken": "^9.0.2",\n    "bcryptjs": "^2.4.3"' : ''}
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/morgan": "^1.9.4",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.1.6"${options.isAuth ? ',\n    "@types/jsonwebtoken": "^9.0.2",\n    "@types/bcryptjs": "^2.4.2"' : ''}
  }
}`,
          language: "json"
        },
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "index.ts",
              type: "file",
              content: `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';${options.isMongoDB ? '\nimport mongoose from \'mongoose\';' : ''}
import { errorHandler } from './middleware/errorHandler';
import dashboardRoutes from './routes/dashboard';${options.isAuth ? '\nimport authRoutes from \'./routes/auth\';' : ''}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);${options.isAuth ? '\napp.use(\'/api/auth\', authRoutes);' : ''}

// Error handling
app.use(errorHandler);

${options.isMongoDB ? `// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));` : ''}

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
              language: "typescript"
            },
            {
              name: "routes",
              type: "folder",
              children: [
                {
                  name: "dashboard.ts",
                  type: "file",
                  content: `import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to your dashboard!',
    timestamp: new Date().toISOString()
  });
});

export default router;`,
                  language: "typescript"
                },
                ...(options.isAuth ? [{
                  name: "auth.ts",
                  type: "file" as const,
                  content: `import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = Router();

// Mock user storage (use database in production)
const users: any[] = [];

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = { id: Date.now(), email, password: hashedPassword };
    users.push(user);

    // Generate token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    
    res.status(201).json({ token, user: { id: user.id, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;`,
                  language: "typescript"
                }] : [])
              ]
            },
            {
              name: "middleware",
              type: "folder",
              children: [
                {
                  name: "errorHandler.ts",
                  type: "file",
                  content: `import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err);
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};`,
                  language: "typescript"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "README.md",
      type: "file",
      content: `# Full-Stack Application

This is a full-stack application with React frontend and Node.js backend.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn${options.isMongoDB ? '\n- MongoDB' : ''}

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   cd client && npm install
   cd ../server && npm install
   \`\`\`

3. Start the development servers:
   \`\`\`bash
   npm run dev
   \`\`\`

This will start both the client (on port 3000) and server (on port 5000) concurrently.

## Project Structure

- \`client/\` - React frontend application
- \`server/\` - Node.js backend API
- \`package.json\` - Root package.json for development scripts

## Features

- React frontend with TypeScript
- Node.js backend with Express
- CORS enabled for cross-origin requests${options.isAuth ? '\n- JWT-based authentication' : ''}${options.isMongoDB ? '\n- MongoDB database integration' : ''}
- Hot reloading in development
- Error handling middleware

## API Endpoints

- \`GET /api/dashboard\` - Get dashboard data${options.isAuth ? '\n- \`POST /api/auth/register\` - Register a new user\n- \`POST /api/auth/login\` - Login user' : ''}`,
      language: "markdown"
    }
  ];

  return structure;
};

const generateReactStructure = (prompt: string, options: { isAuth: boolean }): FileNode[] => {
  return [
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"${options.isAuth ? ',\n    "@auth0/auth0-react": "^2.2.4"' : ''}
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}`,
      language: "json"
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "App.tsx",
          type: "file",
          content: `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';${options.isAuth ? '\nimport Login from \'./pages/Login\';' : ''}
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />${options.isAuth ? '\n          <Route path="/login" element={<Login />} />' : ''}
        </Routes>
      </div>
    </Router>
  );
}

export default App;`,
          language: "typescript"
        },
        {
          name: "pages",
          type: "folder",
          children: [
            {
              name: "Home.tsx",
              type: "file",
              content: `import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to React App</h1>
      <p>This is your home page.</p>
    </div>
  );
};

export default Home;`,
              language: "typescript"
            }
          ]
        }
      ]
    }
  ];
};

const generateNodeStructure = (prompt: string, options: { isAuth: boolean; isMongoDB: boolean }): FileNode[] => {
  return [
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "node-api",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"${options.isMongoDB ? ',\n    "mongoose": "^7.5.0"' : ''}${options.isAuth ? ',\n    "jsonwebtoken": "^9.0.2",\n    "bcryptjs": "^2.4.3"' : ''}
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/morgan": "^1.9.4",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.1.6"${options.isAuth ? ',\n    "@types/jsonwebtoken": "^9.0.2",\n    "@types/bcryptjs": "^2.4.2"' : ''}
  }
}`,
      language: "json"
    }
  ];
};

const generateGenericStructure = (prompt: string): FileNode[] => {
  return [
    {
      name: "README.md",
      type: "file",
      content: `# Project

Generated structure based on: "${prompt}"

## Getting Started

1. Install dependencies
2. Configure your environment
3. Start development

## Project Structure

This is a basic project structure. Please customize based on your specific requirements.`,
      language: "markdown"
    }
  ];
};