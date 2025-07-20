import { useState, useEffect } from "react";
import { PromptInput } from "@/components/PromptInput";
import { FileTreeViewer, FileNode } from "@/components/FileTreeViewer";
import { CodePreview } from "@/components/CodePreview";
import AppPreview from "@/components/AppPreview";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";
import { generateProjectStructure } from "@/services/projectGenerator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [projectStructure, setProjectStructure] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState<string>("");
  const { toast } = useToast();

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setSelectedFile(null);
    
    try {
      const structure = await generateProjectStructure(prompt, tempApiKey);
      setProjectStructure(structure);
      
      toast({
        title: "Project structure generated!",
        description: "Your project structure has been created successfully.",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key required')) {
        setShowApiKeyDialog(true);
        toast({
          title: "API Key Required",
          description: "Please provide your Groq API key to generate AI-powered structures.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Generation failed",
          description: error instanceof Error ? error.message : "There was an error generating your project structure.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySet = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyDialog(false);
    
    // Store in localStorage for persistence
    localStorage.setItem('groq_api_key', apiKey);
    
    toast({
      title: "API Key Set",
      description: "You can now generate AI-powered project structures!",
    });
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('groq_api_key');
    if (storedApiKey) {
      setTempApiKey(storedApiKey);
    }
  }, []);

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
          <Tabs defaultValue="structure" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="structure">File Structure</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">Code View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="structure" className="space-y-0">
              <FileTreeViewer
                structure={projectStructure}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-0">
              <AppPreview projectStructure={projectStructure} />
            </TabsContent>
            
            <TabsContent value="code" className="space-y-0">
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
            </TabsContent>
          </Tabs>
        )}

        <ApiKeyDialog
          isOpen={showApiKeyDialog}
          onApiKeySet={handleApiKeySet}
          onClose={() => setShowApiKeyDialog(false)}
        />
      </div>
    </div>
  );
};

export default Index;
