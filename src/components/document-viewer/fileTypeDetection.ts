/**
 * File type detection utility for document viewer.
 * Priority: mimeType > URL extension
 */

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export type SupportedFileType = "pdf" | "docx" | "txt" | "image" | "unsupported";
=======
export type SupportedFileType = "pdf" | "docx" | "txt" | "unsupported";
>>>>>>> origin/test/share-document-cloudinary
=======
export type SupportedFileType = "pdf" | "docx" | "txt" | "unsupported";
>>>>>>> origin/uichange
=======
export type SupportedFileType = "pdf" | "docx" | "txt" | "image" | "unsupported";
>>>>>>> origin/admin-added
=======
export type SupportedFileType = "pdf" | "docx" | "txt" | "image" | "unsupported";
>>>>>>> origin/update/feature/share

interface MimeTypeMap {
  [key: string]: SupportedFileType;
}

const MIME_TYPE_MAP: MimeTypeMap = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  // PDF
  "application/pdf": "pdf",
  "application/x-pdf": "pdf",

  // DOCX
<<<<<<< HEAD
<<<<<<< HEAD
=======
  "application/pdf": "pdf",
  "application/x-pdf": "pdf",

>>>>>>> origin/test/share-document-cloudinary
=======
  "application/pdf": "pdf",
  "application/x-pdf": "pdf",

>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "docx",

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  // TXT
  "text/plain": "txt",
  "text/x-plain": "txt",

  // Images
  "image/png": "image",
  "image/jpeg": "image",
  "image/jpg": "image",
  "image/gif": "image",
  "image/webp": "image",
  "image/svg+xml": "image",
};

const EXTENSION_MAP: MimeTypeMap = {
  // PDF
  pdf: "pdf",
  // DOCX
  docx: "docx",
  doc: "docx",
  // TXT
  txt: "txt",
  text: "txt",
  // Images
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
  "text/plain": "txt",
  "text/x-plain": "txt",
};

const EXTENSION_MAP: MimeTypeMap = {
  pdf: "pdf",
  docx: "docx",
  doc: "docx",
  txt: "txt",
  text: "txt",
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
};

/**
 * Detect file type from mime type or extension
 * @param mimeType - MIME type from backend (e.g., "application/pdf")
 * @param url - Cloudinary URL to extract extension from
 * @returns Detected file type or "unsupported"
 */
export function detectFileType(
  mimeType: string | null | undefined,
  url: string
): SupportedFileType {
  // Priority 1: Use mimeType if available
  if (mimeType) {
    const normalized = mimeType.toLowerCase().trim();
    if (normalized in MIME_TYPE_MAP) {
      return MIME_TYPE_MAP[normalized];
    }
  }

  // Priority 2: Extract extension from URL
  const extension = extractExtension(url);
  if (extension && extension in EXTENSION_MAP) {
    return EXTENSION_MAP[extension];
  }

  return "unsupported";
}

/**
 * Extract file extension from URL (ignores query parameters)
 */
export function extractExtension(url: string): string | null {
  try {
    // Remove query string
    const cleanUrl = url.split("?")[0];
    // Get last part after dot
    const parts = cleanUrl.split(".");
    const ext = parts[parts.length - 1].toLowerCase();
    // Validate it's reasonable (2-4 chars, alphanumeric)
    return ext.length >= 2 && ext.length <= 4 && /^[a-z0-9]+$/.test(ext)
      ? ext
      : null;
  } catch {
    return null;
  }
}

/**
 * Extract filename from URL
 */
export function extractFileName(url: string): string {
  try {
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/");
    return parts[parts.length - 1] || "document";
  } catch {
    return "document";
  }
}

/**
 * Get human-readable type label
 */
export function getTypeLabel(type: SupportedFileType): string {
  const labels: Record<SupportedFileType, string> = {
    pdf: "PDF",
    docx: "Word Document",
    txt: "Text File",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    image: "Image",
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
    unsupported: "Unsupported File",
  };
  return labels[type];
}
