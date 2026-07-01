import { createContext, useContext, useCallback, useState } from "react";
import type { Document } from "@/lib/types";

export interface SelectedDoc {
  id: string;
  title: string;
  hasSummary: boolean;
}

interface Ctx {
  selected: SelectedDoc[];
  ids: string[];
  toggle: (doc: Document) => void;
  selectAll: (docs: Document[]) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  count: number;
}

const DocumentSelectionContext = createContext<Ctx | null>(null);

export function DocumentSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<SelectedDoc[]>([]);

  const toggle = useCallback((doc: Document) => {
    setSelected((prev) => {
      const exists = prev.find((s) => s.id === doc.id);
      if (exists) return prev.filter((s) => s.id !== doc.id);
      return [
        ...prev,
        { id: doc.id, title: doc.title, hasSummary: !!doc.summary },
      ];
    });
  }, []);

  const selectAll = useCallback((docs: Document[]) => {
    setSelected(
      docs.map((d) => ({
        id: d.id,
        title: d.title,
        hasSummary: !!d.summary,
      }))
    );
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const isSelected = useCallback(
    (id: string) => selected.some((s) => s.id === id),
    [selected]
  );

  const ids = selected.map((s) => s.id);

  return (
    <DocumentSelectionContext.Provider
      value={{
        selected,
        ids,
        toggle,
        selectAll,
        clear,
        isSelected,
        count: selected.length,
      }}
    >
      {children}
    </DocumentSelectionContext.Provider>
  );
}

export function useSelectedDocuments(): Ctx {
  const ctx = useContext(DocumentSelectionContext);
  if (!ctx) throw new Error("useSelectedDocuments must be inside DocumentSelectionProvider");
  return ctx;
}
