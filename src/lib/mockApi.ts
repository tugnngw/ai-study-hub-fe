// src/lib/mockApi.ts
// ------------------------------------------------------------------
// Lightweight mock backend used when no real API server is running.
// Toggle with VITE_MOCK_MODE=false in .env to go back to the real API.
// Any username/password works for login (mock accepts everything),
// or use the seeded account: username "demo" / password "demo123".
// ------------------------------------------------------------------

export const MOCK_MODE =
  (import.meta.env.VITE_MOCK_MODE as string | undefined) !== "false";

const MOCK_TOKEN = "mock-access-token";
const MOCK_REFRESH = "mock-refresh-token";

const MOCK_USER = {
  id: "mock-user-1",
  username: "demo",
  email: "demo@example.com",
  fullName: "Người Dùng Demo",
  avatarUrl: null,
  role: "USER" as const,
  status: "ACTIVE" as const,
  authProvider: "LOCAL" as const,
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

const MOCK_FOLDER = {
  id: "mock-folder-1",
  ownerId: MOCK_USER.id,
  name: "Tài liệu mẫu",
  aiSummary: "Thư mục chứa các tài liệu học tập mẫu để demo giao diện.",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

// Plain-text content rendered through TextViewer via a data: URL,
// so it loads with zero network calls (works fully offline).
const SAMPLE_TEXT = `BÀI 1: TỔNG QUAN VỀ TRÍ TUỆ NHÂN TẠO (AI)

1. Khái niệm
Trí tuệ nhân tạo (Artificial Intelligence - AI) là lĩnh vực khoa học máy tính
nghiên cứu việc tạo ra các hệ thống có khả năng thực hiện những tác vụ vốn đòi
hỏi trí thông minh của con người, như học hỏi, suy luận, nhận diện hình ảnh,
xử lý ngôn ngữ tự nhiên và ra quyết định.

2. Phân loại AI
- AI hẹp (Narrow AI): chỉ thực hiện tốt một tác vụ cụ thể (ví dụ: nhận diện
  khuôn mặt, dịch ngôn ngữ).
- AI tổng quát (General AI): có khả năng tư duy như con người ở nhiều lĩnh vực.
- Siêu AI (Super AI): vượt qua trí tuệ con người ở mọi mặt (hiện vẫn là lý
  thuyết).

3. Học máy (Machine Learning)
Học máy là một nhánh của AI, cho phép máy tính "học" từ dữ liệu mà không cần
được lập trình tường minh cho từng tình huống. Ba dạng học máy phổ biến:
- Học có giám sát (Supervised Learning)
- Học không giám sát (Unsupervised Learning)
- Học tăng cường (Reinforcement Learning)

4. Học sâu (Deep Learning)
Học sâu sử dụng mạng nơ-ron nhân tạo nhiều lớp để tự động trích xuất đặc
trưng từ dữ liệu thô, đặc biệt hiệu quả với hình ảnh, âm thanh và văn bản.

5. Ứng dụng thực tế
AI hiện được ứng dụng rộng rãi trong: trợ lý ảo, xe tự lái, chẩn đoán y tế,
gợi ý sản phẩm trên các nền tảng thương mại điện tử, và các công cụ tạo sinh
nội dung (Generative AI) như ChatGPT, Claude.
`;

function textDataUrl(text: string) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
}

const MOCK_DOCUMENTS = [
  {
    id: 1001,
    ownerId: MOCK_USER.id,
    subjectId: null,
    folderId: MOCK_FOLDER.id,
    title: "Bai-1-Tong-quan-AI.txt",
    description: "Tài liệu mẫu (mock) dùng để test AIChat khi chưa có backend.",
    summary:
      "Tóm tắt: AI là lĩnh vực tạo ra hệ thống mô phỏng trí thông minh con người, gồm Machine Learning và Deep Learning, ứng dụng trong trợ lý ảo, xe tự lái, y tế...",
    status: "ready" as const,
    cloudinaryUrl: textDataUrl(SAMPLE_TEXT),
    publicId: "mock/bai-1",
    mimeType: "text/plain",
    checksum: "mock-checksum-1",
    fileSize: SAMPLE_TEXT.length,
    totalPages: 1,
    createdAt: "2025-01-02T00:00:00.000Z",
    updatedAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 1002,
    ownerId: MOCK_USER.id,
    subjectId: null,
    folderId: MOCK_FOLDER.id,
    title: "Ghi-chu-Machine-Learning.txt",
    description: "Tài liệu mẫu thứ hai để test việc chuyển đổi giữa các file trong AIChat.",
    summary: "Ghi chú nhanh về 3 dạng học máy: có giám sát, không giám sát, tăng cường.",
    status: "ready" as const,
    cloudinaryUrl: textDataUrl(
      "GHI CHÚ: MACHINE LEARNING\n\n1. Supervised Learning - học có giám sát, dùng dữ liệu đã gán nhãn.\n2. Unsupervised Learning - học không giám sát, tự tìm cấu trúc trong dữ liệu.\n3. Reinforcement Learning - học tăng cường, học qua thử-sai và phần thưởng.\n",
    ),
    publicId: "mock/ghi-chu-ml",
    mimeType: "text/plain",
    checksum: "mock-checksum-2",
    fileSize: 400,
    totalPages: 1,
    createdAt: "2025-01-03T00:00:00.000Z",
    updatedAt: "2025-01-03T00:00:00.000Z",
  },
];

const MOCK_FLASHCARDS: Record<number, any[]> = {
  1001: [
    {
      id: 1,
      documentId: 1001,
      frontContent: "AI (Artificial Intelligence) là gì?",
      backContent:
        "Lĩnh vực khoa học máy tính nghiên cứu việc tạo ra hệ thống có khả năng thực hiện các tác vụ đòi hỏi trí thông minh của con người.",
      generatedByAi: true,
      createdAt: "2025-01-02T00:00:00.000Z",
    },
    {
      id: 2,
      documentId: 1001,
      frontContent: "Học máy (Machine Learning) khác AI thế nào?",
      backContent:
        "Học máy là một nhánh con của AI, cho phép máy tính học từ dữ liệu thay vì được lập trình tường minh.",
      generatedByAi: true,
      createdAt: "2025-01-02T00:00:00.000Z",
    },
    {
      id: 3,
      documentId: 1001,
      frontContent: "Học sâu (Deep Learning) là gì?",
      backContent:
        "Sử dụng mạng nơ-ron nhiều lớp để tự động trích xuất đặc trưng từ dữ liệu thô như hình ảnh, âm thanh, văn bản.",
      generatedByAi: true,
      createdAt: "2025-01-02T00:00:00.000Z",
    },
  ],
  1002: [
    {
      id: 4,
      documentId: 1002,
      frontContent: "Supervised Learning là gì?",
      backContent: "Học có giám sát: huấn luyện mô hình bằng dữ liệu đã được gán nhãn sẵn.",
      generatedByAi: true,
      createdAt: "2025-01-03T00:00:00.000Z",
    },
    {
      id: 5,
      documentId: 1002,
      frontContent: "Reinforcement Learning là gì?",
      backContent: "Học tăng cường: agent học qua thử - sai, tối ưu hành động dựa trên phần thưởng nhận được.",
      generatedByAi: true,
      createdAt: "2025-01-03T00:00:00.000Z",
    },
  ],
};

let flashcardAutoId = 1000;

const MOCK_SHARED_WITH_ME = [
  {
    id: 2001,
    name: "Tài liệu Toán Cao Cấp",
    size: "11.4mb",
    items: 6,
    sharedBy: { name: "Nguyễn Văn A", avatarUrl: null },
    time: "21 giờ trước",
    order: 2,
  },
  {
    id: 2002,
    name: "Ghi chú Lập trình Web",
    size: "4.2mb",
    items: 3,
    sharedBy: { name: "Trần Thị B", avatarUrl: null },
    time: "3 ngày trước",
    order: 1,
  },
];

const MOCK_SHARED_BY_ME = [
  {
    id: 3001,
    name: "Đề cương Triết học",
    size: "2.1mb",
    items: 2,
    sharedWith: [{ name: "Lê Văn C", avatarUrl: null }],
    time: "1 ngày trước",
    order: 1,
  },
];

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

type MockOpts = {
  method?: string;
  body?: unknown;
  formData?: FormData;
};

export async function mockRequest<T>(path: string, opts: MockOpts): Promise<T> {
  const method = (opts.method ?? "GET").toUpperCase();
  const [rawPath, query] = path.split("?");
  const qs = new URLSearchParams(query ?? "");

  // ---- AUTH ----
  if (rawPath === "/api/auth/login" && method === "POST") {
    return delay(
      ({
        accessToken: MOCK_TOKEN,
        refreshToken: MOCK_REFRESH,
        expiresIn: 3600,
        userId: MOCK_USER.id,
        username: (opts.body as any)?.username || MOCK_USER.username,
        email: MOCK_USER.email,
        fullName: MOCK_USER.fullName,
        role: MOCK_USER.role,
      }),
    ) as Promise<T>;
  }

  if (rawPath === "/api/auth/register" && method === "POST") {
    return delay(
      ({
        accessToken: MOCK_TOKEN,
        refreshToken: MOCK_REFRESH,
        expiresIn: 3600,
        userId: MOCK_USER.id,
        username: (opts.body as any)?.username || MOCK_USER.username,
        email: (opts.body as any)?.email || MOCK_USER.email,
        fullName: (opts.body as any)?.fullName || MOCK_USER.fullName,
        role: MOCK_USER.role,
      }),
    ) as Promise<T>;
  }

  if (rawPath === "/api/auth/refresh" && method === "POST") {
    return delay(({ accessToken: MOCK_TOKEN, refreshToken: MOCK_REFRESH })) as Promise<T>;
  }

  if (rawPath === "/api/auth/logout" && method === "POST") {
    return delay((undefined)) as Promise<T>;
  }

  // ---- ACCOUNT ----
  if (rawPath === "/api/account/me" && method === "GET") {
    return delay((MOCK_USER)) as Promise<T>;
  }

  // ---- FOLDER ----
  if (rawPath === "/api/folder/getall" && method === "GET") {
    return delay(([MOCK_FOLDER])) as Promise<T>;
  }
  if (rawPath.startsWith("/api/folder/getbyid/") && method === "GET") {
    return delay((MOCK_FOLDER)) as Promise<T>;
  }

  // ---- DOCUMENTS ----
  if (rawPath === "/api/documents" && method === "GET") {
    return delay((MOCK_DOCUMENTS)) as Promise<T>;
  }
  if (rawPath.startsWith("/api/documents/folder/") && method === "GET") {
    return delay((MOCK_DOCUMENTS)) as Promise<T>;
  }
  const docMatch = rawPath.match(/^\/api\/documents\/(\d+)$/);
  if (docMatch && method === "GET") {
    const id = Number(docMatch[1]);
    const doc = MOCK_DOCUMENTS.find((d) => d.id === id) ?? MOCK_DOCUMENTS[0];
    return delay((doc)) as Promise<T>;
  }

  if (rawPath.startsWith("/api/folder/delete/") && method === "DELETE") {
    return delay(undefined) as Promise<T>;
  }

  // ---- SHARES ----
  if (rawPath === "/api/shares/with-me" && method === "GET") {
    return delay(MOCK_SHARED_WITH_ME) as Promise<T>;
  }
  if (rawPath === "/api/shares/by-me" && method === "GET") {
    return delay(MOCK_SHARED_BY_ME) as Promise<T>;
  }
  if (rawPath === "/api/shares/owner" && method === "GET") {
    return delay([]) as Promise<T>;
  }
  if (rawPath === "/api/shares/shared-with-me" && method === "GET") {
    return delay([]) as Promise<T>;
  }
  if (rawPath === "/api/shares" && method === "POST") {
    return delay({ id: 9999, folderId: (opts.body as any)?.folderId, visibility: (opts.body as any)?.visibility ?? "private", createdAt: new Date().toISOString() }) as Promise<T>;
  }
  const shareLinkMatch = rawPath.match(/^\/api\/shares\/(\d+)\/link$/);
  if (shareLinkMatch && method === "GET") {
    return delay({ url: `https://ai-study-hub.example.com/shared/${shareLinkMatch[1]}` }) as Promise<T>;
  }
  const shareDownloadMatch = rawPath.match(/^\/api\/shares\/(\d+)\/download$/);
  if (shareDownloadMatch && method === "GET") {
    return delay({ url: MOCK_DOCUMENTS[0].cloudinaryUrl }) as Promise<T>;
  }
  const shareDeleteMatch = rawPath.match(/^\/api\/shares\/(\d+)$/);
  if (shareDeleteMatch && method === "DELETE") {
    return delay(undefined) as Promise<T>;
  }

  // ---- RAG (AI Chat / Ask) ----
  if (rawPath === "/api/rag/ask" && method === "POST") {
    const body = opts.body as { id?: number; question?: string };
    const doc = MOCK_DOCUMENTS.find((d) => d.id === body?.id);
    const question = body?.question ?? "";
    const answer = doc
      ? `(Mock AI) Dựa trên tài liệu "${doc.title}": ${doc.summary} \n\nCâu hỏi của bạn ("${question}") sẽ được trả lời chính xác khi kết nối backend thật.`
      : `(Mock AI) Đây là câu trả lời mẫu cho câu hỏi: "${question}".`;
    return delay(
      ({
        answer,
        referencedChunks: doc
          ? [{ chunkIndex: 0, content: doc.summary ?? "", similarity: 0.92 }]
          : [],
      }),
      500,
    ) as Promise<T>;
  }

  // ---- FLASHCARDS ----
  if (rawPath === "/api/flashcard" && method === "GET") {
    const documentId = Number(qs.get("documentId"));
    return delay((MOCK_FLASHCARDS[documentId] ?? [])) as Promise<T>;
  }
  if (rawPath === "/api/flashcard/generate" && method === "POST") {
    const documentId = (opts.body as any)?.documentId as number;
    const doc = MOCK_DOCUMENTS.find((d) => d.id === documentId);
    const generated = [
      {
        id: ++flashcardAutoId,
        documentId,
        frontContent: `Thuật ngữ mới từ "${doc?.title ?? "tài liệu"}"`,
        backContent: "Định nghĩa được AI sinh tự động (dữ liệu mock).",
        generatedByAi: true,
        createdAt: new Date().toISOString(),
      },
    ];
    MOCK_FLASHCARDS[documentId] = [...(MOCK_FLASHCARDS[documentId] ?? []), ...generated];
    return delay((MOCK_FLASHCARDS[documentId]), 600) as Promise<T>;
  }
  const progressMatch = rawPath.match(/^\/api\/flashcard\/(\d+)\/progress$/);
  if (progressMatch && method === "PUT") {
    return delay(
      ({
        flashcardId: Number(progressMatch[1]),
        status: (opts.body as any)?.status ?? "new",
        reviewCount: 1,
        lastReviewedAt: new Date().toISOString(),
      }),
    ) as Promise<T>;
  }

  // ---- QUIZ ----
  if (rawPath === "/api/quiz" && method === "GET") {
    return delay(([])) as Promise<T>;
  }
  if (rawPath === "/api/quiz/generate" && method === "POST") {
    return delay(([])) as Promise<T>;
  }

  // ---- Fallback: avoid hard failure for unmocked endpoints ----
  // Default to [] (not null) since most callers expect arrays and do
  // .filter()/.map() on the result without a null-check.
  console.warn(`[mockApi] No mock handler for ${method} ${rawPath} — returning [].`);
  return delay([]) as Promise<T>;
}
