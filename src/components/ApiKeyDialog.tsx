import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Key } from "lucide-react";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onApiKeySet: (apiKey: string) => void;
  onClose: () => void;
}

export const ApiKeyDialog = ({ isOpen, onApiKeySet, onClose }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setApiKey("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Key Required
          </DialogTitle>
          <DialogDescription>
            To generate AI-powered project structures, you need a Groq API key.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Get your free API key from Groq Console:
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open('https://console.groq.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Groq Console
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="gsk_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={!apiKey.trim()} className="flex-1">
                Set API Key
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Your API key is stored locally in your browser</p>
            <p>• Groq offers free tier with generous limits</p>
            <p>• Uses Llama 3.3 70B model for best results</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};