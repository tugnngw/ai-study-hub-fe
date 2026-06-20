export interface ApprovalItem { id: number; title: string; uploader: string; date: string; size: string; }

let mockPending: ApprovalItem[] = [
  { id: 1, title: "Kế hoạch bài dạy môn Tin học 12.pdf", uploader: "Nguyễn Văn Giáo Viên", date: "15/06/2026", size: "3.1mb" },
  { id: 2, title: "Đề cương ôn tập Giải tích 1.pdf", uploader: "Phạm Thị D", date: "16/06/2026", size: "1.8mb" },
];

export const approvalApi = {
  getPendingList: () => Promise.resolve([...mockPending]),
  approve: (id: number) => { mockPending = mockPending.filter(a => a.id !== id); return Promise.resolve(true); },
  reject: (id: number) => { mockPending = mockPending.filter(a => a.id !== id); return Promise.resolve(true); }
};
