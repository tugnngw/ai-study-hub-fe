export interface ReportedFileItem {
  id: number;
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
}
export interface DeletedFileItem { id: number; name: string; deletedDate: string; remainingDays: number; }
export interface DeletedAccountItem { id: number; name: string; email: string; deletedDate: string; remainingDays: number; }

let mockReports: ReportedFileItem[] = [
  { id: 1, name: "Software_Engineering.pdf", uploader: "Nguyễn Văn A", size: "2.4mb", reports: 2, reporter: "Trần Văn A", reason: "Nội dung sao chép nguyên văn từ giáo trình có bản quyền mà không có sự cho phép." },
  { id: 2, name: "Database_System.pdf", uploader: "Trần Thị B", size: "36mb", reports: 1, reporter: "Lê Văn C", reason: "Tài liệu chứa thông tin sai lệch và chưa được kiểm chứng." },
  { id: 3, name: "XXX_XX.docx", uploader: "A Thị B", size: "11.2mb", reports: 4, reporter: "Phạm Thị D", reason: "Nội dung không phù hợp, vi phạm tiêu chuẩn cộng đồng." }
];
let mockDelFiles = [{ id: 1, name: "Software_Engineering.pdf", deletedDate: "12/06/2026", remainingDays: 29 }];
let mockDelAccs = [
  { id: 101, name: "Nguyen Dung A", email: "dunga@student.edu.vn", deletedDate: "12/06/2026", remainingDays: 29 },
  { id: 102, name: "Tran Minh D", email: "minhd@student.edu.vn", deletedDate: "26/06/2026", remainingDays: 15 },
  { id: 103, name: "Nguoi Qua Duong F", email: "quaduongf@student.edu.vn", deletedDate: "09/07/2026", remainingDays: 2 },
];

let reportSeq = 900;

export const fileApi = {
  getReportedFiles: () => Promise.resolve([...mockReports]),
  submitReport: (input: { name: string; uploader: string; size: string; reporter: string; reason: string }) => {
    const existing = mockReports.find((r) => r.name === input.name);
    if (existing) {
      existing.reports += 1;
      existing.reason = input.reason;
    } else {
      mockReports = [
        { id: ++reportSeq, name: input.name, uploader: input.uploader, size: input.size, reports: 1, reporter: input.reporter, reason: input.reason },
        ...mockReports,
      ];
    }
    return Promise.resolve(true);
  },
  handleReportDecision: (id: number, decision: 'remove' | 'reject') => {
    if (decision === 'remove') mockReports = mockReports.filter(f => f.id !== id);
    return Promise.resolve(true);
  },
  getDeletedFiles: () => Promise.resolve([...mockDelFiles]),
  getDeletedAccounts: () => Promise.resolve([...mockDelAccs]),
  permanentDelete: (id: number, type: 'file' | 'account') => {
    if (type === 'file') mockDelFiles = mockDelFiles.filter(f => f.id !== id);
    else mockDelAccs = mockDelAccs.filter(a => a.id !== id);
    return Promise.resolve(true);
  },
  restoreItem: (id: number, type: 'file' | 'account') => {
    if (type === 'file') mockDelFiles = mockDelFiles.filter(f => f.id !== id);
    else mockDelAccs = mockDelAccs.filter(a => a.id !== id);
    return Promise.resolve(true);
  }
};
