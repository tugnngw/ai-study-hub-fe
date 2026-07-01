import { useState } from "react";
import { Sparkles, Loader2, RefreshCw, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelectedDocuments } from "./DocumentSelectionContext";
import { DocumentSelector } from "./DocumentSelector";
import type { Document } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface Props {
  docs: Document[];
  onGenerate: (opts: { documentIds: string[]; force?: boolean }) => void;
  isGenerating: boolean;
  summary: string | null;
}

export function AISummary({ docs, onGenerate, isGenerating, summary }: Props) {
  const { ids, count } = useSelectedDocuments();
  const [showSelector, setShowSelector] = useState(false);

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
        <div className="h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-4">
          <FileText className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-base font-semibold mb-1">No Knowledge Sources</h3>
        <p className="text-sm text-muted-foreground max-w-xs mb-5">
          Select one or more documents to generate an AI Summary.
        </p>
        <Button onClick={() => setShowSelector(true)} variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" /> Choose Documents
        </Button>
        {showSelector && (
          <div className="w-full max-w-sm mt-6 text-left border rounded-xl p-4 bg-card">
            <DocumentSelector docs={docs} />
            <Button
              onClick={() => setShowSelector(false)}
              variant="outline"
              size="sm"
              className="w-full mt-3"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <DocumentSelector docs={docs} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Preparing knowledge...</p>
          </div>
        ) : summary ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-sm text-muted-foreground">
              Click Generate to create an AI Summary from your {count} selected document{count > 1 ? "s" : ""}.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border flex gap-2">
        <Button
          onClick={() => onGenerate({ documentIds: ids })}
          disabled={isGenerating || count === 0}
          className="flex-1 gap-2"
        >
          {isGenerating ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
          ) : (
            <><Sparkles className="h-4 w-4" />{summary ? "Regenerate Summary" : "Generate Summary"}</>
          )}
        </Button>
        {summary && (
          <Button
            variant="outline"
            onClick={() => onGenerate({ documentIds: ids, force: true })}
            disabled={isGenerating}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />Force
          </Button>
        )}
      </div>
    </div>
  );
}
