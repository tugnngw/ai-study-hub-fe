import type { Document, Folder } from "./types";

let folderSeq = 100;
let docSeq = 100;

export const mockFolders: Folder[] = [
  {
    id: 1,
    name: "English for IT",
    description: "Tiếng Anh chuyên ngành Công nghệ thông tin",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: "Programming Vocabulary",
    description: "Từ vựng lập trình thường gặp",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 3,
    name: "Networking & Security",
    description: "Thuật ngữ mạng máy tính & an ninh mạng",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 4,
    name: "Technical Writing",
    description: "Cách viết tài liệu kỹ thuật bằng tiếng Anh",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "English Grammar for IT Students",
    description: "Ngữ pháp tiếng Anh chuyên ngành CNTT",
    folderId: 1,
    fileName: "english_grammar_it.pdf",
    fileSize: 2_450_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 2,
    title: "Common IT Terminology",
    description: "Thuật ngữ CNTT thường dùng trong công việc",
    folderId: 1,
    fileName: "it_terminology.pdf",
    fileSize: 1_980_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 3,
    title: "Software Development Lifecycle",
    description: "Vòng đời phát triển phần mềm — vocabulary & reading",
    folderId: 1,
    fileName: "sdlc_english.pdf",
    fileSize: 3_120_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 4,
    title: "Python Programming Glossary",
    description: "Từ vựng Python: class, function, decorator…",
    folderId: 2,
    fileName: "python_glossary.pdf",
    fileSize: 1_540_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
  {
    id: 5,
    title: "JavaScript & Web Dev Terms",
    description: "DOM, async, promise, framework — phát âm & nghĩa",
    folderId: 2,
    fileName: "js_web_terms.pdf",
    fileSize: 2_010_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 6,
    title: "TCP/IP Networking Vocabulary",
    description: "Packet, protocol, router, subnet — định nghĩa tiếng Anh",
    folderId: 3,
    fileName: "tcpip_vocab.pdf",
    fileSize: 2_780_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 7,
    title: "Cybersecurity Essentials",
    description: "Phishing, malware, encryption — terminology",
    folderId: 3,
    fileName: "cybersecurity.pdf",
    fileSize: 3_450_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 8,
    title: "How to Write a Technical Report",
    description: "Hướng dẫn viết báo cáo kỹ thuật bằng tiếng Anh",
    folderId: 4,
    fileName: "technical_report.pdf",
    fileSize: 1_290_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

// Trash & Shared (mock)
export const mockTrash: Document[] = [
  {
    id: 901,
    title: "Old Java Notes",
    description: "Đã xoá 3 ngày trước",
    folderId: 2,
    fileName: "java_notes_old.pdf",
    fileSize: 870_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

export interface SharedDocument extends Document {
  sharedBy: string;
  sharedAt: string;
}

export const mockShared: Array<SharedDocument> = [
  {
    id: 801,
    title: "Agile & Scrum Glossary",
    description: "Shared by teammate",
    folderId: 4,
    fileName: "agile_scrum.pdf",
    fileSize: 1_240_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    sharedBy: "Nguyen Van A",
    sharedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 802,
    title: "Database Vocabulary Cheatsheet",
    description: "Shared by Lan",
    folderId: 1,
    fileName: "database_vocab.pdf",
    fileSize: 980_000,
    mimeType: "application/pdf",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    sharedBy: "Tran Thi Lan",
    sharedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
];

// In-memory store of "who this document has been shared with" (mock only)
const mockShareRecipients: Record<number, string[]> = {};

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  listFolders: async (): Promise<Folder[]> => {
    await delay();
    return mockFolders.map((f) => ({
      ...f,
      documentCount: mockDocuments.filter((d) => d.folderId === f.id).length,
    }));
  },
  getFolder: async (id: number) => {
    await delay();
    const f = mockFolders.find((x) => x.id === id);
    if (!f) throw new Error("Folder not found");
    return f;
  },
  createFolder: async (input: { name: string; description?: string }) => {
    await delay();
    const f: Folder = { id: ++folderSeq, ...input, createdAt: new Date().toISOString() };
    mockFolders.unshift(f);
    return f;
  },
  updateFolder: async (id: number, input: { name: string; description?: string }) => {
    await delay();
    const f = mockFolders.find((x) => x.id === id);
    if (!f) throw new Error("Folder not found");
    Object.assign(f, input);
    return f;
  },
  deleteFolder: async (id: number) => {
    await delay();
    const i = mockFolders.findIndex((x) => x.id === id);
    if (i >= 0) mockFolders.splice(i, 1);
    return { ok: true };
  },
  listDocuments: async () => {
    await delay();
    return [...mockDocuments];
  },
  listDocsByFolder: async (folderId: number) => {
    await delay();
    return mockDocuments.filter((d) => d.folderId === folderId);
  },
  getDocument: async (id: number) => {
    await delay();
    const d = mockDocuments.find((x) => x.id === id);
    if (!d) throw new Error("Document not found");
    return d;
  },
  uploadDocument: async (input: {
    file: File;
    folderId: number;
    title: string;
    description?: string;
  }) => {
    await delay(400);
    const d: Document = {
      id: ++docSeq,
      title: input.title,
      description: input.description,
      folderId: input.folderId,
      fileName: input.file.name,
      fileSize: input.file.size,
      mimeType: input.file.type,
      createdAt: new Date().toISOString(),
    };
    mockDocuments.unshift(d);
    return d;
  },
  deleteDocument: async (id: number) => {
    await delay();
    const i = mockDocuments.findIndex((x) => x.id === id);
    if (i >= 0) {
      const [removed] = mockDocuments.splice(i, 1);
      mockTrash.unshift(removed);
    }
    return { ok: true };
  },
  listTrash: async () => {
    await delay();
    return [...mockTrash];
  },
  restoreFromTrash: async (id: number) => {
    await delay();
    const i = mockTrash.findIndex((x) => x.id === id);
    if (i >= 0) {
      const [d] = mockTrash.splice(i, 1);
      mockDocuments.unshift(d);
    }
    return { ok: true };
  },
  emptyTrash: async (id: number) => {
    await delay();
    const i = mockTrash.findIndex((x) => x.id === id);
    if (i >= 0) mockTrash.splice(i, 1);
    return { ok: true };
  },
  listShared: async () => {
    await delay();
    return [...mockShared];
  },
  getShareInfo: async (id: number) => {
    await delay();
    const doc = mockDocuments.find((x) => x.id === id);
    if (!doc) throw new Error("Document not found");
    return {
      recipients: mockShareRecipients[id] ?? [],
      link: `${typeof window !== "undefined" ? window.location.origin : ""}/shared/${id}`,
    };
  },
  shareDocument: async (input: { id: number; email: string }) => {
    await delay();
    const d = mockDocuments.find((x) => x.id === input.id);
    if (!d) throw new Error("Document not found");
    const list = (mockShareRecipients[input.id] ??= []);
    if (!list.includes(input.email)) list.push(input.email);
    mockShared.unshift({
      ...d,
      sharedBy: "You",
      id: 9000 + d.id,
      sharedAt: new Date().toISOString(),
    });
    return {
      ok: true,
      email: input.email,
      recipients: [...list],
      link: `${typeof window !== "undefined" ? window.location.origin : ""}/shared/${input.id}`,
    };
  },
  reportDocument: async (input: { id: number; reason: string; description?: string }) => {
    await delay(300);
    const d = mockDocuments.find((x) => x.id === input.id);
    if (!d) throw new Error("Document not found");
    // Mock: in a real backend this would create a report ticket.
    return { ok: true };
  },
  deleteSharedDocument: async (sharedId: number) => {
    await delay();
    const i = mockShared.findIndex((x) => x.id === sharedId);
    if (i >= 0) mockShared.splice(i, 1);
    return { ok: true };
  },
  saveSharedDocument: async (input: {
    sharedId: number;
    folderId: number;
    title: string;
    description?: string;
  }) => {
    await delay(300);
    const shared = mockShared.find((x) => x.id === input.sharedId);
    if (!shared) throw new Error("Shared document not found");
    const d: Document = {
      id: ++docSeq,
      title: input.title,
      description: input.description,
      folderId: input.folderId,
      fileName: shared.fileName,
      fileSize: shared.fileSize,
      mimeType: shared.mimeType,
      createdAt: new Date().toISOString(),
    };
    mockDocuments.unshift(d);
    return d;
  },
  downloadDocument: async (id: number) => {
    await delay();
    return { url: `#mock-download-${id}` };
  },
  ask: async (input: { id: number; question: string }) => {
    await delay(600);
    const doc = mockDocuments.find((d) => d.id === input.id);
    return {
      answer: `(Mock) Dựa trên tài liệu "${doc?.title ?? "—"}", câu trả lời cho "${input.question}" sẽ được tạo bởi backend RAG khi bạn kết nối API thật.`,
    };
  },
};

export const mockStorage = {
  usedBytes: () => mockDocuments.reduce((s, d) => s + (d.fileSize ?? 0), 0),
  totalBytes: 15 * 1024 * 1024 * 1024,
};
