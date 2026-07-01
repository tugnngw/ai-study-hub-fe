import { useState, useMemo } from "react";
import { Search, X, FileText, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSelectedDocuments } from "./DocumentSelectionContext";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
}

export function DocumentSelector({ docs }: Props) {
  const { selected, toggle, selectAll, clear, isSelected, count } =
    useSelectedDocuments();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      query
        ? docs.filter((d) =>
            d.title.toLowerCase().includes(query.toLowerCase())
          )
        : docs,
    [docs, query]
  );

  const allSelected = docs.length > 0 && docs.every((d) => isSelected(d.id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Knowledge Sources
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {count} selected
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="pl-8 h-8 text-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (allSelected ? clear() : selectAll(docs))}
          className="text-xs h-7 px-2 gap-1"
        >
          {allSelected ? (
            <CheckSquare className="h-3.5 w-3.5" />
          ) : (
            <Square className="h-3.5 w-3.5" />
          )}
          {allSelected ? "Deselect All" : "Select All"}
        </Button>
        {count > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-xs h-7 px-2 gap-1 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-1 max-h-60 overflow-y-auto">
        {filtered.map((doc) => {
          const sel = selected.find((s) => s.id === doc.id);
          const active = !!sel;
          return (
            <button
              key={doc.id}
              onClick={() => toggle(doc)}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors border",
                active
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border hover:bg-accent"
              )}
            >
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{doc.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      sel?.hasSummary ? "bg-green-500" : "bg-muted-foreground/40"
                    )}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {sel?.hasSummary
                      ? "Cached AI Summary"
                      : "Summary will be generated"}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                  active
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/30"
                )}
              >
                {active && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7"/></svg>
                )}
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-xs text-muted-foreground text-center py-4">
            No documents found
          </div>
        )}
      </div>
    </div>
  );
}
