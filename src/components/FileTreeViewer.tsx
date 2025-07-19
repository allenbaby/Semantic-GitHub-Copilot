import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  Folder, 
  FileText, 
  Copy, 
  Download,
  ChevronRight,
  ChevronDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

interface FileTreeViewerProps {
  structure: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFile: FileNode | null;
}

export const FileTreeViewer = ({ structure, onFileSelect, selectedFile }: FileTreeViewerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return '📄';
      case 'json':
        return '⚙️';
      case 'css':
      case 'scss':
        return '🎨';
      case 'html':
        return '🌐';
      case 'md':
        return '📝';
      case 'env':
        return '🔐';
      default:
        return '📄';
    }
  };

  const renderNode = (node: FileNode, path: string, depth: number = 0) => {
    const fullPath = `${path}/${node.name}`;
    const isExpanded = expandedFolders.has(fullPath);
    const isSelected = selectedFile?.name === node.name;

    return (
      <div key={fullPath}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors hover:bg-secondary/50",
            isSelected && "bg-primary/20 border-l-2 border-primary",
            depth > 0 && "ml-4"
          )}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(fullPath);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-primary" />
              ) : (
                <Folder className="w-4 h-4 text-muted-foreground" />
              )}
            </>
          ) : (
            <>
              <span className="w-4 h-4 flex items-center justify-center text-xs">
                {getFileIcon(node.name)}
              </span>
            </>
          )}
          <span className={cn(
            "text-sm font-mono",
            node.type === 'folder' && "font-medium",
            isSelected && "text-primary font-medium"
          )}>
            {node.name}
          </span>
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) =>
              renderNode(child, fullPath, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const copyStructure = () => {
    const structureText = JSON.stringify(structure, null, 2);
    navigator.clipboard.writeText(structureText);
  };

  const downloadStructure = () => {
    const structureText = JSON.stringify(structure, null, 2);
    const blob = new Blob([structureText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-structure.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (structure.length === 0) {
    return (
      <Card className="h-full bg-file-tree-bg border-code-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Project Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <div className="text-center space-y-2">
              <Folder className="w-12 h-12 mx-auto opacity-50" />
              <p>No structure generated yet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-file-tree-bg border-code-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Project Structure
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyStructure}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadStructure}
              className="h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1 max-h-[600px] overflow-y-auto">
          {structure.map((node) =>
            renderNode(node, '', 0)
          )}
        </div>
      </CardContent>
    </Card>
  );
};