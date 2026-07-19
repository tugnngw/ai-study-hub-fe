import { c as tokenStore, s as API_BASE } from "./realApi-DdsVabnO.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { t as Card } from "./card-CtX3ithx.js";
import { n as Input } from "./label-B7oQAA24.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, Download, ExternalLink, File, Loader2, Maximize2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import * as mammoth from "mammoth";
//#region src/components/document-viewer/PdfViewer.tsx
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;
/**
* PdfViewer — Direct pdfjs-dist canvas renderer
* More reliable than react-pdf, full control over rendering
*/
var PdfViewer = ({ url, fileName = "document.pdf", className, documentId }) => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const [pdfDoc, setPdfDoc] = useState(null);
	const [pdfData, setPdfData] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [scale, setScale] = useState(1);
	const [fitToPage, setFitToPage] = useState(true);
	useEffect(() => {
		let cancelled = false;
		const loadPdfData = async () => {
			setLoading(true);
			setError(null);
			const fetchBuffer = async (fetchUrl, authToken) => {
				const res = await fetch(fetchUrl, { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const buf = await res.arrayBuffer();
				if (!buf || buf.byteLength === 0) throw new Error("Empty response");
				return buf;
			};
			try {
				const token = tokenStore.get();
				let arrayBuffer = null;
				if (documentId) try {
					const downloadResp = await fetch(`${API_BASE}/api/documents/${documentId}/download`, {
						method: "GET",
						headers: { Authorization: `Bearer ${token}` }
					});
					if (downloadResp.ok) if ((downloadResp.headers.get("content-type") || "").includes("json")) {
						const data = await downloadResp.json();
						const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
						if (signedUrl) try {
							arrayBuffer = await fetchBuffer(signedUrl, token);
						} catch {
							throw new Error("signed URL failed");
						}
						else throw new Error("No URL in response");
					} else {
						arrayBuffer = await downloadResp.arrayBuffer();
						if (!arrayBuffer || arrayBuffer.byteLength === 0) throw new Error("Empty response");
					}
					else throw new Error(`API ${downloadResp.status}`);
				} catch (e) {
					console.warn("[PdfViewer] Backend API failed, trying direct URL:", e);
					try {
						arrayBuffer = await fetchBuffer(url);
					} catch (e2) {
						console.warn("[PdfViewer] Direct fetch also failed:", e2);
						if (!cancelled) setError("Không thể tải PDF. Mở tab mới để xem.");
						return;
					}
				}
				else try {
					arrayBuffer = await fetchBuffer(url);
				} catch {
					if (!cancelled) setError("Không thể tải PDF.");
					return;
				}
				if (!cancelled && arrayBuffer) setPdfData(new Uint8Array(arrayBuffer));
			} catch (e) {
				console.error("[PdfViewer] Fetch failed:", e);
				if (!cancelled) setError(e.message || "Không thể tải PDF");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		loadPdfData();
		return () => {
			cancelled = true;
		};
	}, [url, documentId]);
	useEffect(() => {
		let cancelled = false;
		const loadDocument = async () => {
			if (!pdfData) return;
			setLoading(true);
			setError(null);
			try {
				const doc = await pdfjsLib.getDocument({ data: pdfData }).promise;
				if (!cancelled) {
					setPdfDoc(doc);
					setNumPages(doc.numPages);
					setPageNumber(1);
				}
			} catch (e) {
				console.error("[PdfViewer] Document load error:", e);
				if (!cancelled) setError(e.message || "Không thể tải PDF");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		loadDocument();
		return () => {
			cancelled = true;
		};
	}, [pdfData]);
	const renderPage = useCallback(async () => {
		if (!pdfDoc || !canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;
		try {
			const page = await pdfDoc.getPage(pageNumber);
			const viewport = page.getViewport({ scale });
			const canvas = canvasRef.current;
			canvas.width = viewport.width * (window.devicePixelRatio || 1);
			canvas.height = viewport.height * (window.devicePixelRatio || 1);
			canvas.style.width = `${viewport.width}px`;
			canvas.style.height = `${viewport.height}px`;
			ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
			await page.render({
				canvasContext: ctx,
				viewport
			}).promise;
		} catch (e) {
			console.error("[PdfViewer] Page render error:", e);
		}
	}, [
		pdfDoc,
		pageNumber,
		scale
	]);
	useEffect(() => {
		renderPage();
	}, [renderPage]);
	const handleZoom = (direction) => {
		if (direction === "fit") setFitToPage((prev) => !prev);
		else if (direction === "in") {
			setScale((prev) => Math.min(prev + .25, 3));
			setFitToPage(false);
		} else {
			setScale((prev) => Math.max(prev - .25, .25));
			setFitToPage(false);
		}
	};
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!numPages) return;
			if (e.key === "ArrowLeft" || e.key === "PageUp") setPageNumber((p) => Math.max(1, p - 1));
			else if (e.key === "ArrowRight" || e.key === "PageDown") setPageNumber((p) => Math.min(numPages, p + 1));
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [numPages]);
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 flex-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm font-semibold text-gray-800 truncate max-w-[250px]",
				children: fileName
			}), numPages && /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-gray-500",
				children: [numPages, " trang"]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [
				numPages && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1 border-r border-gray-200 pr-2",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleZoom("out"),
							disabled: scale <= .25,
							title: "Thu nhỏ",
							className: "h-8 w-8 p-0",
							children: /* @__PURE__ */ jsx(ZoomOut, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-xs text-gray-600 w-8 text-center",
							children: [Math.round(scale * 100), "%"]
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleZoom("in"),
							disabled: scale >= 3,
							title: "Phóng to",
							className: "h-8 w-8 p-0",
							children: /* @__PURE__ */ jsx(ZoomIn, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleZoom("fit"),
							title: "Vừa khung",
							className: cn("h-8 w-8 p-0", !fitToPage && "bg-gray-100"),
							children: /* @__PURE__ */ jsx(Maximize2, { className: "h-4 w-4" })
						})
					]
				}),
				numPages && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1 border-r border-gray-200 px-2",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setPageNumber((p) => Math.max(1, p - 1)),
							disabled: pageNumber <= 1,
							title: "Trang trước",
							className: "h-8 w-8 p-0",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx(Input, {
							type: "number",
							min: 1,
							max: numPages,
							value: pageNumber,
							onChange: (e) => {
								setPageNumber(Math.min(Math.max(1, parseInt(e.target.value) || 1), numPages));
							},
							className: "h-8 w-10 px-2 py-0 text-center text-xs border-gray-300"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-xs text-gray-600",
							children: ["/ ", numPages]
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setPageNumber((p) => Math.min(numPages, p + 1)),
							disabled: pageNumber >= numPages,
							title: "Trang sau",
							className: "h-8 w-8 p-0",
							children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "h-8 px-2 text-xs",
					children: /* @__PURE__ */ jsxs("a", {
						href: url,
						download: true,
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }), "Tải xuống"]
					})
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "h-8 px-2 text-xs",
					children: /* @__PURE__ */ jsxs("a", {
						href: url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-1" }), "Mở mới"]
					})
				})
			]
		})]
	});
	if (error) return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
		children: [Toolbar, /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8 bg-white",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-red-500 text-center mb-4 font-medium",
				children: error
			}), /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }), "Tải xuống tệp"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0 bg-white", className),
		children: [Toolbar, /* @__PURE__ */ jsx("div", {
			ref: containerRef,
			className: "flex-1 overflow-auto bg-gray-100 flex items-start justify-center py-6",
			children: loading ? /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center justify-center p-12",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-blue-500 mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-gray-600",
					children: "Đang tải PDF..."
				})]
			}) : /* @__PURE__ */ jsx("div", {
				className: "bg-white shadow-lg rounded-sm",
				children: /* @__PURE__ */ jsx("canvas", {
					ref: canvasRef,
					className: "block"
				})
			})
		})]
	});
};
//#endregion
//#region src/components/document-viewer/cloudinaryUtils.ts
/**
* Cloudinary URL utilities
*
* Issue: Cloudinary PDF URLs are blocked by CORS when using fetch() or react-pdf.
* Solution: Use iframe for Cloudinary PDFs (browser native PDF viewer, no CORS issues).
* For non-Cloudinary URLs, use the existing react-pdf viewer.
*
* For other file types (TXT, DOCX), we'll fetch content directly if it's not Cloudinary.
* If it IS Cloudinary and not PDF, we'll need to decide if iframe works or if we need to fetch.
*/
var CLOUDINARY_HOSTS = ["cloudinary.com", "res.cloudinary.com"];
/**
* Check if a URL is a Cloudinary URL
*/
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
* Fetch file content from Cloudinary URL and create a Blob
* This is generally needed for non-PDF types where iframe isn't used,
* or if direct fetching is preferred.
*/
async function fetchCloudinaryFile(url, options) {
	if (!url || typeof url !== "string" || url.trim() === "") return null;
	const timeout = options?.timeout || 3e4;
	try {
		console.log("[CloudinaryUtils] Fetching file from:", url);
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const response = await fetch(url, {
			method: "GET",
			headers: { "Accept": "*/*" },
			signal: controller.signal,
			mode: "cors",
			credentials: "omit"
		});
		clearTimeout(timeoutId);
		if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		const blob = await response.blob();
		console.log("[CloudinaryUtils] File fetched successfully:", {
			url,
			size: blob.size,
			type: blob.type
		});
		return blob;
	} catch (error) {
		console.error("[CloudinaryUtils] Error fetching file:", {
			url,
			error: error instanceof Error ? error.message : String(error)
		});
		return null;
	}
}
/**
* Create an object URL from a fetched file (Blob)
*/
async function createCloudinaryBlobUrl(cloudinaryUrl) {
	const blob = await fetchCloudinaryFile(cloudinaryUrl);
	if (!blob) return null;
	const objectUrl = URL.createObjectURL(blob);
	console.log("[CloudinaryUtils] Created object URL:", objectUrl);
	return objectUrl;
}
/**
* Clean up an object URL created with createCloudinaryBlobUrl
*/
function cleanupBlobUrl(objectUrl) {
	if (objectUrl && objectUrl.startsWith("blob:")) try {
		URL.revokeObjectURL(objectUrl);
		console.log("[CloudinaryUtils] Cleaned up blob URL:", objectUrl);
	} catch (error) {
		console.error("[CloudinaryUtils] Error cleaning up blob URL:", error);
	}
}
//#endregion
//#region src/components/document-viewer/DocxViewer.tsx
var DocxViewer = ({ url, fileName = "document.docx", className }) => {
	const containerRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const [processedUrl, setProcessedUrl] = useState(null);
	const isCloudinary = isCloudinaryUrl(url);
	useEffect(() => {
		let isMounted = true;
		let currentBlobUrl = null;
		const processUrl = async () => {
			setProcessedUrl(null);
			setLoading(true);
			const blobUrl = await createCloudinaryBlobUrl(url);
			if (isMounted) {
				if (blobUrl) {
					setProcessedUrl(blobUrl);
					setError(null);
					currentBlobUrl = blobUrl;
				} else setProcessedUrl(null);
				setLoading(false);
			}
		};
		if (isCloudinary) processUrl();
		else {
			setProcessedUrl(null);
			setLoading(false);
		}
		return () => {
			isMounted = false;
			if (currentBlobUrl) cleanupBlobUrl(currentBlobUrl);
		};
	}, [url, isCloudinary]);
	const fetchAndRender = useCallback(async () => {
		if (!containerRef.current) return;
		let isMounted = true;
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(isCloudinary && processedUrl ? processedUrl : url, {
				method: "GET",
				headers: { Accept: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			const arrayBuffer = await response.arrayBuffer();
			if (!isMounted) return;
			const result = await mammoth.convertArrayBuffer({
				arrayBuffer,
				options: {
					styleMap: [
						"p[style-name='Heading 1'] => h1:fresh",
						"p[style-name='Heading 2'] => h2:fresh",
						"p[style-name='Heading 3'] => h3:fresh",
						"p[style-name='Normal'] => p:fresh",
						"p[style-name='List Paragraph'] => p:fresh"
					],
					includeEmbeddedStyleMap: true
				}
			});
			if (!isMounted || !containerRef.current) return;
			containerRef.current.innerHTML = result.value;
			if (result.messages.length > 0) console.warn("DOCX conversion warnings:", result.messages);
			setLoading(false);
		} catch (e) {
			if (!isMounted) return;
			console.error("DOCX render error:", e);
			const errorMsg = e instanceof Error ? e.message : "Unknown error";
			if (isCloudinary && (errorMsg.includes("HTTP 4") || errorMsg.includes("fetch"))) setError("Không thể tải file từ Cloudinary. Vui lòng tải xuống để xem.");
			else if (errorMsg.includes("format") || errorMsg.includes("xml")) setError("File DOCX không hợp lệ hoặc bị hỏng. Vui lòng tải lên file khác.");
			else setError(`Lỗi: ${errorMsg}`);
			setLoading(false);
		}
		return () => {
			isMounted = false;
		};
	}, [
		url,
		isCloudinary,
		processedUrl
	]);
	useEffect(() => {
		fetchAndRender();
	}, [
		url,
		retryCount,
		fetchAndRender
	]);
	const handleRetry = () => {
		setRetryCount((prev) => prev + 1);
	};
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-sm font-medium truncate max-w-[200px]",
			children: fileName
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }), "Tải xuống"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-1" }), "Mở tab mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
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
					children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }), "Thử lại"]
				})]
			}),
			!loading && !error && /* @__PURE__ */ jsx("div", {
				className: "flex-1 overflow-auto p-6",
				children: /* @__PURE__ */ jsx("div", {
					ref: containerRef,
					className: "prose prose-sm max-w-none dark:prose-invert prose-img:max-w-full prose-img:h-auto",
					style: {
						fontSize: "14px",
						lineHeight: "1.6"
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
		className: "flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-sm font-medium truncate max-w-[200px]",
			children: fileName
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }), "Tải xuống"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-1" }), "Mở tab mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
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
		className: "flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-sm font-medium truncate max-w-[200px]",
			children: fileName
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: fileUrl,
					download: true,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }), "Tải xuống"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: fileUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-1" }), "Mở tab mới"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
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
/**
* DocumentViewer - Main orchestrator component
*
* Validates backend data and selects correct viewer:
* - Priority 1: document.mimeType
* - Priority 2: Extension from cloudinaryUrl
*
* Supported types:
* - PDF: react-pdf with lazy page loading
* - DOCX: docx-preview with retry logic
* - TXT: Plain text with line preservation
* - Unsupported: Friendly message + download
*/
var DocumentViewer = ({ document, className }) => {
	console.log("[Debug Flow] DocumentViewer: Received document prop:", {
		id: document.id,
		title: document.title,
		status: document.status,
		cloudinaryUrl: document.cloudinaryUrl,
		mimeType: document.mimeType,
		publicId: document.publicId
	});
	if (document.status === "processing") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: [
				/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mb-3" }),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Đang xử lý tài liệu..."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: "Vui lòng đợi trong giây lát"
				})
			]
		})
	});
	if (document.status === "failed") return /* @__PURE__ */ jsx(Card, {
		className: `flex flex-col overflow-hidden min-h-0 ${className || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-red-500 font-medium mb-2",
				children: "Không thể tải tài liệu"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Tài liệu đã xảy ra lỗi khi xử lý"
			})]
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
				documentId: document.id
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
