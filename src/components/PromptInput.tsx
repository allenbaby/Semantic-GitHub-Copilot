import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput = ({ onGenerate, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    "Build a todo app with Reactjs with ultra modern Ui with colors",
    "Create a user authentication system with JWT and password reset",
    "Full-stack notes app with sharing features and real-time collaboration",
    "E-commerce site with product catalog, cart, and payment integration"
  ];

  return (
    <Card className="p-6 bg-gradient-card border-code-border shadow-card-custom">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Semantic GitHub Copilot
          </h1>
          <p className="text-muted-foreground">
            Describe your project and get a complete structure with boilerplate code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium text-foreground">
              Project Description
            </label>
            <Textarea
              id="prompt"
              placeholder="e.g., Build a full-stack notes app with React frontend, Node backend, MongoDB. Include login, CRUD, and share features."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] bg-code-bg border-code-border focus:border-primary resize-none"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            variant="gradient" 
            size="lg" 
            className="w-full"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Structure...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Project Structure
              </>
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Try these examples:</p>
          <div className="grid gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="developer"
                size="sm"
                className="text-left justify-start h-auto py-2 px-3 text-xs"
                onClick={() => setPrompt(example)}
                disabled={isLoading}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};