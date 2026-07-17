import { n as formatBytes, t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { t as Card } from "./card-CzWHiRuJ.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Download, ExternalLink, File, FileText, Loader2, RotateCw } from "lucide-react";
//#region src/components/document-viewer/PdfViewer.tsx
var PdfViewer = ({ url, fileName = "document.pdf", className, fileSize, mimeType, totalPages, createdAt }) => {
	const ext = (fileName.split(".").pop() || "PDF").toUpperCase();
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col min-h-0", className),
		style: { minHeight: "400px" },
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 min-w-0",
					children: [
						/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-sm font-semibold truncate max-w-[160px]",
							children: fileName
						}),
						totalPages && /* @__PURE__ */ jsxs("span", {
							className: "text-[11px] text-muted-foreground whitespace-nowrap",
							children: [
								"/ ",
								totalPages,
								" trang"
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-1",
					children: /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						className: "h-7 px-1.5 text-[11px]",
						children: /* @__PURE__ */ jsxs("a", {
							href: url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }), "Mở mới"]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 min-h-0 rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center",
				children: !url ? /* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground text-center px-6",
					children: "Không có đường dẫn xem trước cho file này."
				}) : /* @__PURE__ */ jsx("iframe", {
					src: url,
					title: fileName,
					className: "w-full h-full"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsxs("span", { children: ["Loại: ", mimeType || ext] }),
					/* @__PURE__ */ jsxs("span", { children: ["Kích thước: ", formatBytes(fileSize)] }),
					createdAt && /* @__PURE__ */ jsxs("span", { children: ["Ngày tải lên: ", new Date(createdAt).toLocaleDateString("vi-VN")] })
				]
			})
		]
	});
};
//#endregion
//#region src/components/document-viewer/cloudinaryUtils.ts
/**
* Cloudinary URL utilities
*/
var CLOUDINARY_HOSTS = ["cloudinary.com", "res.cloudinary.com"];
function isCloudinaryUrl(url) {
	if (!url || typeof url !== "string" || url.trim() === "") return false;
	try {
		const urlObj = new URL(url);
		return CLOUDINARY_HOSTS.some((host) => urlObj.hostname.includes(host));
	} catch {
		return false;
	}
}
/**
* Fetch file content from Cloudinary URL.
* Sửa lỗi bằng cách thêm `fl_attachment=false` vào query string nếu cần.
*/
async function fetchCloudinaryFile(url, options) {
	if (!url || typeof url !== "string" || url.trim() === "") return null;
	const timeout = options?.timeout || 3e4;
	let targetUrl = url;
	if (isCloudinaryUrl(url)) try {
		const urlObj = new URL(url);
		urlObj.searchParams.set("fl_attachment", "false");
		targetUrl = urlObj.toString();
	} catch {}
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const response = await fetch(targetUrl, {
			method: "GET",
			headers: { "Accept": "*/*" },
			signal: controller.signal,
			mode: "cors",
			credentials: "omit"
		});
		clearTimeout(timeoutId);
		if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		return await response.blob();
	} catch (error) {
		console.error("[CloudinaryUtils] Error fetching file:", error);
		return null;
	}
}
//#endregion
//#region src/components/document-viewer/DocxViewer.tsx
var DocxViewer = ({ url, fileName = "document.docx", className }) => {
	const containerRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const isCloudinary = isCloudinaryUrl(url);
	const fetchAndRender = useCallback(async () => {
		if (!containerRef.current) {
			setTimeout(() => {
				if (containerRef.current) fetchAndRender();
			}, 50);
			return;
		}
		try {
			setLoading(true);
			setError(null);
			containerRef.current.innerHTML = "";
			let arrayBuffer = null;
			if (isCloudinary) {
				const blob = await fetchCloudinaryFile(url);
				if (!blob) throw new Error("Không thể tải file từ Cloudinary");
				arrayBuffer = await blob.arrayBuffer();
			} else {
				const response = await fetch(url);
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				arrayBuffer = await response.arrayBuffer();
			}
			if (!arrayBuffer) throw new Error("Dữ liệu file rỗng");
			const { renderAsync } = await import("./docx-preview-SI5XXGUv.js");
			if (containerRef.current) await renderAsync(arrayBuffer, containerRef.current, {
				renderImages: true,
				experimental: true,
				useBase64: true
			});
			setLoading(false);
		} catch (e) {
			console.error("DOCX render error:", e);
			setError(e.message || "Không thể hiển thị nội dung file.");
			setLoading(false);
		}
	}, [url, isCloudinary]);
	useEffect(() => {
		setLoading(true);
		setError(null);
		fetchAndRender();
	}, [
		url,
		retryCount,
		fetchAndRender
	]);
	const handleRetry = () => setRetryCount((prev) => prev + 1);
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-semibold truncate max-w-[160px]",
				children: fileName
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-0.5 flex-wrap",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-1" }), " Tải"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }), " Mở mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col min-h-0", className),
		children: [
			Toolbar,
			loading && /* @__PURE__ */ jsxs("div", {
				className: "flex-1 flex flex-col items-center justify-center p-8",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Đang tải DOCX..."
				})]
			}),
			error && !loading && /* @__PURE__ */ jsxs("div", {
				className: "flex-1 flex flex-col items-center justify-center p-8",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-red-500 text-center mb-4 text-sm",
					children: error
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleRetry,
					children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }), " Thử lại"]
				})]
			}),
			!loading && !error && /* @__PURE__ */ jsx("div", {
				className: "flex-1 overflow-auto p-6 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					ref: containerRef,
					className: "docx-viewer prose prose-sm max-w-none dark:prose-invert",
					style: {
						fontSize: "14px",
						lineHeight: "1.6",
						height: "100%",
						width: "100%",
						minHeight: "400px",
						overflow: "auto"
					}
				})
			})
		]
	});
};
//#endregion
//#region src/components/document-viewer/TextViewer.tsx
var TextViewer = ({ url, fileName = "document.txt", className }) => {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const isCloudinary = isCloudinaryUrl(url);
	const fetchText = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(url);
			if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			setContent(await response.text());
			setLoading(false);
		} catch (e) {
			console.error("Text fetch error:", e);
			const errorMsg = e instanceof Error ? e.message : "Unknown error";
			if (isCloudinary) setError("Không thể tải file text từ Cloudinary do CORS. Vui lòng tải xuống để xem.");
			else setError(`Không thể tải file: ${errorMsg}`);
			setLoading(false);
		}
	}, [url, isCloudinary]);
	useEffect(() => {
		fetchText();
	}, [
		url,
		retryCount,
		fetchText
	]);
	const handleRetry = () => {
		setRetryCount((prev) => prev + 1);
	};
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-semibold truncate max-w-[160px]",
				children: fileName
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-0.5 flex-wrap",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-1" }), " Tải"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }), " Mở mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col min-h-0", className),
		children: [
			Toolbar,
			loading && /* @__PURE__ */ jsxs("div", {
				className: "flex-1 flex flex-col items-center justify-center p-8",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Đang tải file text..."
				})]
			}),
			error && !loading && /* @__PURE__ */ jsxs("div", {
				className: "flex-1 flex flex-col items-center justify-center p-8",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-red-500 text-center mb-3 text-sm",
						children: error
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleRetry,
						children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }), "Thử lại"]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Hoặc tải xuống để xem"
					})
				]
			}),
			!loading && !error && !content && /* @__PURE__ */ jsx("div", {
				className: "flex-1 flex items-center justify-center p-8",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-sm",
					children: "File trống"
				})
			}),
			!loading && !error && content && /* @__PURE__ */ jsx("div", {
				className: "flex-1 overflow-auto p-6",
				children: /* @__PURE__ */ jsx("pre", {
					className: "whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground break-words",
					children: content
				})
			})
		]
	});
};
//#endregion
//#region src/components/document-viewer/UnsupportedFileViewer.tsx
var UnsupportedFileViewer = ({ fileName, detectedType, fileUrl, className }) => {
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-semibold truncate max-w-[160px]",
				children: fileName
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-0.5 flex-wrap",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: fileUrl,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-1" }), " Tải"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: fileUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }), " Mở mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col min-h-0", className),
		children: [Toolbar, /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-muted-foreground mb-4",
					children: /* @__PURE__ */ jsx(File, { className: "h-12 w-12" })
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-lg font-semibold text-primary mb-1",
					children: fileName
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground mb-6",
					children: ["Loại tệp không được hỗ trợ để xem: ", /* @__PURE__ */ jsx("strong", { children: detectedType })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						children: /* @__PURE__ */ jsxs("a", {
							href: fileUrl,
							download: true,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }), "Tải xuống"]
						})
					}), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ jsxs("a", {
							href: fileUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), "Mở trong tab mới"]
						})
					})]
				})
			]
		})]
	});
};
//#endregion
//#region src/components/document-viewer/fileTypeDetection.ts
var MIME_TYPE_MAP = {
	"application/pdf": "pdf",
	"application/x-pdf": "pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
	"application/msword": "docx",
	"text/plain": "txt",
	"text/x-plain": "txt",
	"image/png": "image",
	"image/jpeg": "image",
	"image/jpg": "image",
	"image/gif": "image",
	"image/webp": "image",
	"image/svg+xml": "image"
};
var EXTENSION_MAP = {
	pdf: "pdf",
	docx: "docx",
	doc: "docx",
	txt: "txt",
	text: "txt",
	png: "image",
	jpg: "image",
	jpeg: "image",
	gif: "image",
	webp: "image",
	svg: "image"
};
/**
* Detect file type from mime type or extension
* @param mimeType - MIME type from backend (e.g., "application/pdf")
* @param url - Cloudinary URL to extract extension from
* @returns Detected file type or "unsupported"
*/
function detectFileType(mimeType, url) {
	if (mimeType) {
		const normalized = mimeType.toLowerCase().trim();
		if (normalized in MIME_TYPE_MAP) return MIME_TYPE_MAP[normalized];
	}
	const extension = extractExtension(url);
	if (extension && extension in EXTENSION_MAP) return EXTENSION_MAP[extension];
	return "unsupported";
}
/**
* Extract file extension from URL (ignores query parameters)
*/
function extractExtension(url) {
	try {
		const parts = url.split("?")[0].split(".");
		const ext = parts[parts.length - 1].toLowerCase();
		return ext.length >= 2 && ext.length <= 4 && /^[a-z0-9]+$/.test(ext) ? ext : null;
	} catch {
		return null;
	}
}
/**
* Extract filename from URL
*/
function extractFileName(url) {
	try {
		const parts = url.split("?")[0].split("/");
		return parts[parts.length - 1] || "document";
	} catch {
		return "document";
	}
}
/**
* Get human-readable type label
*/
function getTypeLabel(type) {
	return {
		pdf: "PDF",
		docx: "Word Document",
		txt: "Text File",
		unsupported: "Unsupported File"
	}[type];
}
//#endregion
//#region src/components/document-viewer/DocumentViewer.tsx
var DocumentViewer = ({ document, className }) => {
	console.log("[Debug Flow] DocumentViewer: Received document prop:", {
		id: document.id,
		title: document.title,
		status: document.status,
		cloudinaryUrl: document.cloudinaryUrl,
		mimeType: document.mimeType,
		publicId: document.publicId
	});
	if (document.status === "REJECT") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center space-y-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-red-500",
						children: /* @__PURE__ */ jsx("svg", {
							className: "h-12 w-12 mx-auto mb-3",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 1.5,
								d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							})
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg font-medium text-red-600",
						children: "Tài liệu đã bị từ chối duyệt"
					}),
					document.rejectReason && /* @__PURE__ */ jsxs("div", {
						className: "bg-red-50 border border-red-200 rounded-lg p-3 mt-2 max-w-md",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-red-800 mb-1",
							children: "Lý do từ chối:"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-700",
							children: document.rejectReason
						})]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-gray-600 mt-3",
						children: [
							"Vui lòng chỉnh sửa lại nội dung tài liệu và tải lên lại,",
							/* @__PURE__ */ jsx("br", {}),
							"hoặc liên hệ quản trị viên để biết thêm chi tiết."
						]
					})
				]
			})
		})
	});
	if (document.status === "BANNED") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center space-y-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-red-500",
						children: /* @__PURE__ */ jsx("svg", {
							className: "h-12 w-12 mx-auto mb-3",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 1.5,
								d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							})
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg font-medium text-red-600",
						children: "Tài liệu đã bị cấm"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Tài liệu vi phạm quy định và đã bị quản trị viên khoá."
					})
				]
			})
		})
	});
	if (document.status === "REPORTED") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center space-y-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-lg font-medium text-amber-600",
					children: "Tài liệu đã bị báo cáo"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-gray-500",
					children: "Tài liệu đang được quản trị viên xem xét."
				})]
			})
		})
	});
	console.log("[Debug Flow] DocumentViewer: File URL:", document.cloudinaryUrl);
	const fileUrl = document.cloudinaryUrl;
	if (!fileUrl || fileUrl.trim() === "") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-red-500 font-medium mb-2",
					children: "Không có tệp để hiển thị"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Tài liệu này chưa được tải lên hoặc URL không hợp lệ."
				})]
			})
		})
	});
	if (!document.mimeType) console.warn(`Document ${document.id} (${document.title}) missing mimeType. Fallback to URL extension.`);
	const fileType = detectFileType(document.mimeType, fileUrl);
	console.log("[Debug Flow] DocumentViewer: Detected File Type:", fileType);
	const fileName = document.title || extractFileName(fileUrl);
	switch (fileType) {
		case "pdf":
			console.log("[Debug Flow] DocumentViewer: Rendering PdfViewer");
			return /* @__PURE__ */ jsx(PdfViewer, {
				url: fileUrl,
				fileName,
				className,
				documentId: document.id,
				fileSize: document.fileSize,
				mimeType: document.mimeType,
				totalPages: document.totalPages,
				createdAt: document.createdAt
			});
		case "docx":
			console.log("[Debug Flow] DocumentViewer: Rendering DocxViewer");
			return /* @__PURE__ */ jsx(DocxViewer, {
				url: fileUrl,
				fileName,
				className
			});
		case "txt":
			console.log("[Debug Flow] DocumentViewer: Rendering TextViewer");
			return /* @__PURE__ */ jsx(TextViewer, {
				url: fileUrl,
				fileName,
				className
			});
		default:
			console.log("[Debug Flow] DocumentViewer: Rendering UnsupportedFileViewer");
			return /* @__PURE__ */ jsx(UnsupportedFileViewer, {
				fileName,
				detectedType: getTypeLabel("unsupported"),
				fileUrl,
				className
			});
	}
};
//#endregion
export { DocumentViewer as t };
