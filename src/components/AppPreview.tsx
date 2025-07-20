import { Sandpack } from "@codesandbox/sandpack-react";
import { FileNode } from "@/components/FileTreeViewer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AppPreviewProps {
  projectStructure: FileNode[];
}

const AppPreview = ({ projectStructure }: AppPreviewProps) => {
  if (!projectStructure.length) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-semibold mb-2">No Preview Available</h3>
          <p>Generate a project structure to see the live preview</p>
        </div>
      </Card>
    );
  }

  // Convert FileNode structure to Sandpack files format
  const convertToSandpackFiles = (nodes: FileNode[], basePath = ""): Record<string, string> => {
    const files: Record<string, string> = {};

    nodes.forEach((node) => {
      const fullPath = basePath ? `${basePath}/${node.name}` : node.name;

      if (node.type === "file" && node.content) {
        files[fullPath] = node.content;
      } else if (node.type === "folder" && node.children) {
        Object.assign(files, convertToSandpackFiles(node.children, fullPath));
      }
    });

    return files;
  };

  function findFileContentByName(
    files: Record<string, string>,
    name: string,
    rKey: string = "N"
  ): string | null {
    for (const key of Object.keys(files)) {
      if (key.includes(name)) {
        const res = (rKey === 'Y') ? key : files[key];
        return res
      }
    }
    return null;
  }



  const sandpackFiles = convertToSandpackFiles(projectStructure);

  // Extract dependencies from package.json if it exists
  const getProjectDependencies = () => {
    const packageJsonFile = findFileContentByName(sandpackFiles, "package.json");
    if (packageJsonFile) {
      try {
        const packageJson = JSON.parse(packageJsonFile);
        return {
          ...packageJson.dependencies,
          ...packageJson.devDependencies
        };
      } catch (error) {
        console.error("Failed to parse package.json:", error);
      }
    }

    // Default React dependencies if no package.json found
    return {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "@types/react": "^18.3.3",
      "@types/react-dom": "^18.3.0"
    };
  };

  const projectDependencies = getProjectDependencies();

  // Find the main entry point - check README first, then common patterns
  const findMainEntryPoint = () => {
    // Check README for instructions
    const readmeFile = findFileContentByName(sandpackFiles, "README.md") || findFileContentByName(sandpackFiles, "readme.md");
    if (readmeFile) {
      // Look for common patterns in README that indicate main file
      const lowerReadme = readmeFile.toLowerCase();
      if (lowerReadme.includes('npm start') || lowerReadme.includes('npm run dev')) {
        // This suggests it's a standard React app
      }
    }

    // Check package.json for main entry or scripts
    const packageJsonFile = findFileContentByName(sandpackFiles, "package.json");
    if (packageJsonFile) {
      try {
        const packageJson = JSON.parse(packageJsonFile);
        if (packageJson.main) {
          return packageJson.main;
        }
      } catch (error) {
        console.error("Failed to parse package.json:", error);
      }
    }

    // Look for common entry points in order of preference
    const entryPoints = [
      "src/index.tsx", "src/index.jsx", "src/index.js", "src/index.ts",
      "src/main.tsx", "src/main.jsx", "src/main.js", "src/main.ts",
      "index.tsx", "index.jsx", "index.js", "index.ts",
      "main.tsx", "main.jsx", "main.js", "main.ts"
    ];

    for (const entry of entryPoints) {
      const res = (findFileContentByName(sandpackFiles, entry, 'Y'))
      if (res) {
        return res;
      }
    }

    return null;
  };

  const mainEntry = findMainEntryPoint();

  // Only add minimal fallbacks if absolutely necessary
  if (!mainEntry) {
    // No main entry found, create minimal structure
    sandpackFiles["src/index.tsx"] = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);`;

    // Only add App if no App file exists anywhere
    const hasAppFile = Object.keys(sandpackFiles).some(path =>
      /\/(App|app)\.(tsx|jsx|js|ts)$/.test(path) || /^(App|app)\.(tsx|jsx|js|ts)$/.test(path)
    );

    if (!hasAppFile) {
      sandpackFiles["src/App.tsx"] = `import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Generated App Preview</h1>
      <p>This is a preview of your generated project structure.</p>
    </div>
  );
}`;
    }
  }

  if (!findFileContentByName(sandpackFiles, "index.html")) {
    sandpackFiles["public/index.html"] = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`;
  }

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <Sandpack
          template="react-ts"
          files={sandpackFiles}
          theme="dark"
          options={{
            showNavigator: false,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: "100%",
            layout: "preview",
            autorun: true,
          }}
          customSetup={{
            dependencies: projectDependencies,
            entry: mainEntry
          }}
        />
      </CardContent>
    </Card>
  );
};

export default AppPreview;