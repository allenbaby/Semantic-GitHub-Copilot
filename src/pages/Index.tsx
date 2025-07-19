import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { FileTreeViewer, FileNode } from "@/components/FileTreeViewer";
import { CodePreview } from "@/components/CodePreview";
import { generateProjectStructure } from "@/services/projectGenerator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [projectStructure, setProjectStructure] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setSelectedFile(null);
    
    try {
      const structure = await generateProjectStructure(prompt);
      setProjectStructure(structure);
      
      toast({
        title: "Project structure generated!",
        description: "Your project structure has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your project structure.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto">
          <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        
        {(projectStructure.length > 0 || isLoading) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <FileTreeViewer
                structure={projectStructure}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>
            <div className="lg:col-span-1">
              <CodePreview selectedFile={selectedFile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
