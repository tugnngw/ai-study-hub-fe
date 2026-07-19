
import { useDocuments, useFolders } from "@/lib/queries";

// ⚠️ DB chưa có cột storage quota theo user → hạn mức tạm hardcode ở FE
// (khớp mockup: 15 GB). Khi BE có endpoint quota, thay hằng số này.
const QUOTA_GB = 15;

function toGb(bytes: number) {
  return bytes / 1024 ** 3;
}
function fmtGb(bytes: number) {
  return `${toGb(bytes).toFixed(1)}gb`;
}

// Phân loại tệp theo mimeType → nhãn + màu
function fileKind(mime?: string | null): "PDF" | "DOCX" | "PPTX" | "Khác" {
  const m = (mime ?? "").toLowerCase();
  if (m.includes("pdf")) return "PDF";
  if (m.includes("word") || m.includes("doc")) return "DOCX";
  if (m.includes("presentation") || m.includes("ppt")) return "PPTX";
  return "Khác";
}

const kindColor: Record<string, string> = {
  PDF: "bg-red-500",
  DOCX: "bg-blue-500",
  PPTX: "bg-amber-500",
  Khác: "bg-gray-800",
};

export function CloudPage() {
  const docs = useDocuments();
  const folders = useFolders();
  const list = docs.data ?? [];

  const usedBytes = list.reduce((s, d) => s + (d.fileSize ?? 0), 0);
  const usedGb = toGb(usedBytes);
  const freeGb = Math.max(0, QUOTA_GB - usedGb);
  const usedPct = Math.min(100, (usedGb / QUOTA_GB) * 100);

  // Dung lượng theo thư mục (gộp file_size theo folderId)
  const byFolder = (folders.data ?? [])
    .map((f) => {
      const bytes = list
        .filter((d) => d.folderId === f.id)
        .reduce((s, d) => s + (d.fileSize ?? 0), 0);
      return { name: f.name, bytes };
    })
    .filter((x) => x.bytes > 0)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);
  const maxFolderBytes = Math.max(1, ...byFolder.map((x) => x.bytes));

  // Loại tệp (gộp theo kind)
  const kinds = ["PDF", "DOCX", "PPTX", "Khác"] as const;
  const byKind = kinds
    .map((k) => {
      const bytes = list
        .filter((d) => fileKind(d.mimeType) === k)
        .reduce((s, d) => s + (d.fileSize ?? 0), 0);
      const pct = usedBytes > 0 ? Math.round((bytes / usedBytes) * 100) : 0;
      return { kind: k, bytes, pct };
    })
    .filter((x) => x.bytes > 0);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display font-bold text-[24px]">Bộ Nhớ</h1>
        <p className="text-muted-foreground text-[14px] mt-1">Xem và quản lý dung lượng bộ nhớ của bạn</p>
      </div>

      {/* Tổng dung lượng */}
      <div className="rounded-2xl border border-border/70 bg-white p-6">
        <p className="text-[15px] font-semibold">Dung lượng đã dùng gần đây</p>
        <p className="font-display font-bold text-[22px] mt-1">
          {usedGb.toFixed(1)} GB <span className="text-muted-foreground font-normal text-[16px]">/ {QUOTA_GB} GB</span>
        </p>
        <div className="mt-4 h-3.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${usedPct}%` }} />
        </div>
        <div className="flex items-center justify-between mt-2 text-[12px] text-muted-foreground">
          <span>Bạn đã sử dụng {Math.round(usedPct)}% dung lượng</span>
          <span>Còn trống {freeGb.toFixed(1)}gb</span>
        </div>
      </div>

      {/* 2 cột: theo thư mục / loại tệp */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Theo thư mục */}
        <div className="rounded-2xl border border-border/70 bg-white p-6">
          <p className="text-[14px] font-semibold mb-4">Dung lượng theo thư mục</p>
          {byFolder.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3.5">
              {byFolder.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <span className="text-[12px] w-24 shrink-0 truncate text-muted-foreground">{f.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(f.bytes / maxFolderBytes) * 100}%` }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground w-12 text-right shrink-0">{fmtGb(f.bytes)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Loại tệp */}
        <div className="rounded-2xl border border-border/70 bg-white p-6">
          <p className="text-[14px] font-semibold mb-4">Loại tệp</p>
          {byKind.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3.5">
              {byKind.map((k) => (
                <div key={k.kind} className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-sm shrink-0 ${kindColor[k.kind]}`} />
                  <span className="text-[13px] font-medium w-14 shrink-0">{k.kind}</span>
                  <span className="text-[12px] text-muted-foreground flex-1">{fmtGb(k.bytes)}</span>
                  <span className="text-[13px] font-semibold">{k.pct}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
