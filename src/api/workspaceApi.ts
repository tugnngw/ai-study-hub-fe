import {
  AppUser,
  AskResponse,
  DocumentItem,
  FolderItem,
  SharedDocumentItem,
} from '../types/userTypes';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

let folderSeq = 100;
let docSeq = 100;

let mockFolders: FolderItem[] = [
  {
    id: 1,
    name: 'English for IT',
    description: 'Tiếng Anh chuyên ngành Công nghệ thông tin',
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: 'Programming Vocabulary',
    description: 'Từ vựng lập trình thường gặp',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 3,
    name: 'Networking & Security',
    description: 'Thuật ngữ mạng máy tính & an ninh mạng',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 4,
    name: 'Technical Writing',
    description: 'Cách viết tài liệu kỹ thuật bằng tiếng Anh',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

let mockDocuments: DocumentItem[] = [
  {
    id: 1,
    title: 'English Grammar for IT Students',
    description: 'Ngữ pháp tiếng Anh chuyên ngành CNTT',
    folderId: 1,
    fileName: 'english_grammar_it.pdf',
    fileSize: 2_450_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 2,
    title: 'Common IT Terminology',
    description: 'Thuật ngữ CNTT thường dùng trong công việc',
    folderId: 1,
    fileName: 'it_terminology.pdf',
    fileSize: 1_980_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 3,
    title: 'Software Development Lifecycle',
    description: 'Vòng đời phát triển phần mềm — vocabulary & reading',
    folderId: 1,
    fileName: 'sdlc_english.pdf',
    fileSize: 3_120_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 4,
    title: 'Python Programming Glossary',
    description: 'Từ vựng Python: class, function, decorator…',
    folderId: 2,
    fileName: 'python_glossary.pdf',
    fileSize: 1_540_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
  {
    id: 5,
    title: 'JavaScript & Web Dev Terms',
    description: 'DOM, async, promise, framework — phát âm & nghĩa',
    folderId: 2,
    fileName: 'js_web_terms.pdf',
    fileSize: 2_010_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 6,
    title: 'TCP/IP Networking Vocabulary',
    description: 'Packet, protocol, router, subnet — định nghĩa tiếng Anh',
    folderId: 3,
    fileName: 'tcpip_vocab.pdf',
    fileSize: 2_780_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 7,
    title: 'Cybersecurity Essentials',
    description: 'Phishing, malware, encryption — terminology',
    folderId: 3,
    fileName: 'cybersecurity.pdf',
    fileSize: 3_450_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 8,
    title: 'How to Write a Technical Report',
    description: 'Hướng dẫn viết báo cáo kỹ thuật bằng tiếng Anh',
    folderId: 4,
    fileName: 'technical_report.pdf',
    fileSize: 1_290_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

let mockTrash: DocumentItem[] = [
  {
    id: 901,
    title: 'Old Java Notes',
    description: 'Đã xoá 3 ngày trước',
    folderId: 2,
    fileName: 'java_notes_old.pdf',
    fileSize: 870_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

let mockShared: SharedDocumentItem[] = [
  {
    id: 801,
    title: 'Agile & Scrum Glossary',
    description: 'Shared by teammate',
    folderId: 4,
    fileName: 'agile_scrum.pdf',
    fileSize: 1_240_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    sharedBy: 'Nguyen Van A',
  },
  {
    id: 802,
    title: 'Database Vocabulary Cheatsheet',
    description: 'Shared by Lan',
    folderId: 1,
    fileName: 'database_vocab.pdf',
    fileSize: 980_000,
    mimeType: 'application/pdf',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    sharedBy: 'Tran Thi Lan',
  },
];

export const CURRENT_USER: AppUser = {
  id: 1,
  email: 'demo@aistudyhub.vn',
  fullName: 'Nguyễn Văn A',
};

export const workspaceApi = {
  getFolders: async (): Promise<FolderItem[]> => {
    await delay();
    return mockFolders.map((f) => ({
      ...f,
      documentCount: mockDocuments.filter((d) => d.folderId === f.id).length,
    }));
  },
  getFolder: async (id: number): Promise<FolderItem> => {
    await delay();
    const f = mockFolders.find((x) => x.id === id);
    if (!f) throw new Error('Không tìm thấy thư mục');
    return f;
  },
  createFolder: async (input: { name: string; description?: string }): Promise<FolderItem> => {
    await delay();
    const f: FolderItem = { id: ++folderSeq, ...input, createdAt: new Date().toISOString() };
    mockFolders = [f, ...mockFolders];
    return f;
  },
  updateFolder: async (id: number, input: { name: string; description?: string }): Promise<FolderItem> => {
    await delay();
    const f = mockFolders.find((x) => x.id === id);
    if (!f) throw new Error('Không tìm thấy thư mục');
    Object.assign(f, input);
    return f;
  },
  deleteFolder: async (id: number): Promise<boolean> => {
    await delay();
    mockFolders = mockFolders.filter((x) => x.id !== id);
    return true;
  },

  getDocuments: async (): Promise<DocumentItem[]> => {
    await delay();
    return [...mockDocuments];
  },
  getDocumentsByFolder: async (folderId: number): Promise<DocumentItem[]> => {
    await delay();
    return mockDocuments.filter((d) => d.folderId === folderId);
  },
  getDocument: async (id: number): Promise<DocumentItem | undefined> => {
    await delay();
    return mockDocuments.find((x) => x.id === id);
  },
  uploadDocument: async (input: {
    file: File;
    folderId: number;
    title: string;
    description?: string;
  }): Promise<DocumentItem> => {
    await delay(400);
    const d: DocumentItem = {
      id: ++docSeq,
      title: input.title,
      description: input.description,
      folderId: input.folderId,
      fileName: input.file.name,
      fileSize: input.file.size,
      mimeType: input.file.type,
      createdAt: new Date().toISOString(),
    };
    mockDocuments = [d, ...mockDocuments];
    return d;
  },
  deleteDocument: async (id: number): Promise<boolean> => {
    await delay();
    const idx = mockDocuments.findIndex((x) => x.id === id);
    if (idx >= 0) {
      const [removed] = mockDocuments.splice(idx, 1);
      mockTrash = [removed, ...mockTrash];
    }
    return true;
  },
  shareDocument: async (input: { id: number; email: string }): Promise<boolean> => {
    await delay();
    const d = mockDocuments.find((x) => x.id === input.id);
    if (!d) throw new Error('Không tìm thấy tài liệu');
    mockShared = [{ ...d, sharedBy: 'Bạn', id: 9000 + d.id }, ...mockShared];
    return true;
  },

  getTrash: async (): Promise<DocumentItem[]> => {
    await delay();
    return [...mockTrash];
  },
  restoreFromTrash: async (id: number): Promise<boolean> => {
    await delay();
    const idx = mockTrash.findIndex((x) => x.id === id);
    if (idx >= 0) {
      const [d] = mockTrash.splice(idx, 1);
      mockDocuments = [d, ...mockDocuments];
    }
    return true;
  },
  permanentlyDelete: async (id: number): Promise<boolean> => {
    await delay();
    mockTrash = mockTrash.filter((x) => x.id !== id);
    return true;
  },

  getShared: async (): Promise<SharedDocumentItem[]> => {
    await delay();
    return [...mockShared];
  },
  removeShared: async (id: number): Promise<boolean> => {
    await delay();
    mockShared = mockShared.filter((x) => x.id !== id);
    return true;
  },

  askRag: async (input: { id: number; question: string }): Promise<AskResponse> => {
    await delay(600);
    const doc = mockDocuments.find((d) => d.id === input.id);
    return {
      answer: `(Mock) Dựa trên tài liệu "${doc?.title ?? '—'}", câu trả lời cho "${input.question}" sẽ được tạo bởi backend RAG khi kết nối API thật.`,
    };
  },
};

export const storageApi = {
  usedBytes: () => mockDocuments.reduce((sum, d) => sum + (d.fileSize ?? 0), 0),
  totalBytes: 15 * 1024 * 1024 * 1024,
};
