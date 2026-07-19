import { Link } from "react-router-dom";

import { useState } from "react";
import { FileText, Plus, MoreHorizontal, Folder } from "lucide-react";
import { useDocuments, useSubjectsBySemester } from "@/lib/queries";

// Màu nền gradient cho card ghi chú (xoay vòng)
const noteGradients = [
  "from-[#7B68F5] to-[#9B8AFB]",
  "from-[#8A7CF7] to-[#B0A3FC]",
  "from-[#9D7BF6] to-[#C3AEFD]",
];

export function Dashboard() {
  const docs = useDocuments();

  const recentDocs = (docs.data ?? [])
    .slice()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 3)
    .map((d) => ({
      id: String(d.id),
      title: d.title,
      subtitle: formatDocMeta(d),
    }));

  return (
    <div className="space-y-9">
      {/* Tiêu đề */}
      <div>
        <h1 className="font-display font-bold text-[26px] leading-tight">Chào mừng trở lại</h1>
        <p className="text-muted-foreground text-[14px] mt-1">Truy cập nhanh vào tài liệu của bạn</p>
      </div>

      {/* Sổ ghi chú gần đây */}
      <section>
        <h2 className="font-display font-bold text-[18px] mb-4">Sổ ghi chú gần đây</h2>
        {recentDocs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-10 text-center text-[14px] text-muted-foreground">
            Chưa có ghi chú nào
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDocs.map((n, i) => (
              <div
                key={n.id}
                className={`relative h-[150px] rounded-2xl bg-gradient-to-br ${noteGradients[i % 3]} p-4 text-white shadow-soft overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <button type="button" className="text-white/80 hover:text-white">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-semibold text-[14px] truncate">{n.title}</p>
                  <p className="text-white/70 text-[12px] mt-0.5">{n.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tài liệu gần đây */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-[18px]">Tài liệu gần đây</h2>
          <Link to="/documents" className="flex items-center gap-1 text-primary text-[13px] font-medium hover:underline">
            <Plus className="h-4 w-4" /> Tạo mới
          </Link>
        </div>
        {recentDocs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-10 text-center text-[14px] text-muted-foreground">
            Chưa có tài liệu nào
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentDocs.map((d) => (
              <Link
                key={d.id}
                to="/documents"
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-white px-4 py-3 hover:border-primary/40 hover:shadow-soft transition-all"
              >
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[13px] truncate">{d.title}</p>
                  <p className="text-muted-foreground text-[11px]">{d.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Môn học theo kỳ */}
      <SemesterSection />
    </div>
  );
}

function SemesterSection() {
  const [activeSem, setActiveSem] = useState(1);
  const chips = Array.from({ length: 9 }, (_, i) => i + 1);
  const subjects = useSubjectsBySemester(activeSem);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[18px] mb-4">Môn học theo kỳ</h2>
        <div className="flex flex-wrap gap-2">
          {chips.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setActiveSem(k)}
              className={`h-9 px-4 rounded-full text-[13px] font-medium border transition-colors ${
                activeSem === k
                  ? "bg-secondary border-primary/30 text-primary"
                  : "bg-white border-border/70 text-muted-foreground hover:border-primary/30"
              }`}
            >
              Kỳ {k}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-[16px] mb-3">Môn học kỳ {activeSem}</h3>
        {(subjects.data?.length ?? 0) === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-10 text-center text-[14px] text-muted-foreground">
            Chưa có môn học trong kỳ này
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.data!.map((s: any, i: number) => (
              <div
                key={s.id ?? i}
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-white px-4 py-3.5 hover:border-primary/40 hover:shadow-soft transition-all cursor-pointer"
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${subjectColors[i % 3]}`}>
                  <Folder className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[13px] truncate">{s.code ? `${s.code} - ${s.name}` : s.name}</p>
                  <p className="text-muted-foreground text-[11px]">{s.docCount ?? s.documentCount ?? 0} tài liệu</p>
                </div>
                <MoreHorizontal className="h-4.5 w-4.5 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function formatDocMeta(d: { mimeType?: string | null; fileSize?: number | null }) {
  const type = (d.mimeType ?? "").includes("pdf") ? "PDF" : "Tài liệu";
  const size = d.fileSize ? `${(d.fileSize / 1024 ** 2).toFixed(1)}mb` : "";
  return [type, size].filter(Boolean).join(" · ");
}

const subjectColors = [
  "bg-indigo-50 text-indigo-500",
  "bg-emerald-50 text-emerald-500",
  "bg-violet-50 text-violet-500",
];
