// src/components/document-workspace/ChatPanel.tsx
// AI Chat panel with message history, typing indicator, Enter to send

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, MessageSquare, Bot, User } from "lucide-react";
import { toast } from "sonner";
import { useAskRag } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMsg { role: "user" | "assistant"; content: string; }

export function ChatPanel({ docId, docTitle }: { docId?: number; docTitle: string }) {
  const ask = useAskRag();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submitChat = async () => {
    if (!input.trim() || !docId) return;
    const q = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", content: q }]);
    try {
      const res = await ask.mutateAsync({ id: docId, question: q });
      setMessages(m => [...m, { role: "assistant", content: res.answer }]);
    } catch {
      toast.error("Không thể kết nối AI. Thử lại sau.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitChat(); }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-card border border-border rounded-2xl shadow-soft">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-border bg-gradient-soft">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold">💬 Trò chuyện với AI</div>
            <div className="text-[10px] text-muted-foreground truncate max-w-[160px]">{docTitle || "Chưa chọn tài liệu"}</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <div className="h-12 w-12 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Hỏi AI về tài liệu</div>
            <div className="text-xs text-muted-foreground mt-1 max-w-[200px]">
              Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này.
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={cn("flex gap-2", m.role === "user" ? "flex-row-reverse" : "")}>
              <div className={cn("h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5", m.role === "user" ? "bg-primary text-white" : "bg-muted-foreground/20")}>
                {m.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
              </div>
              <div className={cn("text-sm rounded-2xl px-3.5 py-2.5 max-w-[80%] leading-relaxed", m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-md" : "bg-muted text-foreground rounded-tl-md")}>
                {m.content}
              </div>
            </div>
          ))
        )}
        {ask.isPending && (
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-muted-foreground/20 flex items-center justify-center shrink-0">
              <Bot className="h-3 w-3" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 p-3 border-t border-border">
        <div className="flex gap-2">
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này."
            className="flex-1 resize-none rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background min-h-[40px] max-h-[100px]"
            rows={1} disabled={!docId} />
          <Button onClick={submitChat} size="icon" disabled={!input.trim() || !docId || ask.isPending}
            className="rounded-xl shrink-0 bg-primary hover:bg-primary/90 disabled:opacity-40">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
