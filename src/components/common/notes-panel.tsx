import { Check, Copy, Save, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

const NOTES_STORAGE_KEY = "riskguard-notes";

export function NotesPanel() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(NOTES_STORAGE_KEY, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-accent/10 border-t border-sidebar-border">
      <div className="p-3 border-b border-sidebar-border flex items-center justify-between bg-accent/20">
        <div className="flex items-center gap-2 h-2">
          <StickyNote className="h-4 w-4 text-foreground" />
          <span className="text-sm font-medium">Notes</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
            title="Copy notes"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleSave}
            title="Save notes"
          >
            <Save className={cn("h-3 w-3", saved && "text-green-600")} />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type your notes here..."
          className="min-h-full border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </div>
    </div>
  );
}
