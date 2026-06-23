export { DocumentViewer } from "./DocumentViewer";
export { PdfViewer } from "./PdfViewer";
export { DocxViewer } from "./DocxViewer";
export { TextViewer } from "./TextViewer";
export { UnsupportedFileViewer } from "./UnsupportedFileViewer";
export {
  detectFileType,
  extractExtension,
  extractFileName,
  getTypeLabel,
} from "./fileTypeDetection";
export type { SupportedFileType } from "./fileTypeDetection";