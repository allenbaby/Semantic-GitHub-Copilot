import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileText } from "lucide-react";
import { FileNode } from "./FileTreeViewer";

interface CodePreviewProps {
  selectedFile: FileNode | null;
}

export const CodePreview = ({ selectedFile }: CodePreviewProps) => {
  const editorRef = useRef(null);

  const getLanguageFromExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
      case 'scss':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'php':
        return 'php';
      default:
        return 'plaintext';
    }
  };

  const copyToClipboard = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  if (!selectedFile) {
    return (
      <Card className="h-full bg-code-bg border-code-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Code Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 mx-auto opacity-50" />
              <p>Select a file to preview its content</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-code-bg border-code-border shadow-code">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="text-xs">
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'js' && '📄'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'ts' && '📄'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'tsx' && '📄'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'jsx' && '📄'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'json' && '⚙️'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'css' && '🎨'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'html' && '🌐'}
              {selectedFile.name.split('.').pop()?.toLowerCase() === 'md' && '📝'}
              {!['js', 'ts', 'tsx', 'jsx', 'json', 'css', 'html', 'md'].includes(selectedFile.name.split('.').pop()?.toLowerCase() || '') && '📄'}
            </span>
            <span className="font-mono">{selectedFile.name}</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg overflow-hidden border border-code-border">
          <Editor
            height="500px"
            language={selectedFile.language || getLanguageFromExtension(selectedFile.name)}
            value={selectedFile.content || '// No content available'}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace",
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};