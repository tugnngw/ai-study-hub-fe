import { r as tokenStore, t as API_BASE } from "./api-WaaweWSf.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, Download, ExternalLink, File, FileText, Hand, Loader2, Maximize2, MousePointer2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
//#region src/components/document-viewer/PdfViewer.tsx
/**
* PdfViewer — hiển thị PDF bằng cách sử dụng backend download API để lấy signed URL
*
* Quy trình:
* 1. Gọi backend download API (có Bearer token) để lấy signed URL
* 2. Nếu thành công, dùng signed URL để hiển thị PDF qua <embed>
* 3. Nếu thất bại, fallback về URL gốc (có thể vẫn hoạt động nếu không private)
* 4. Hiển thị lỗi và nút tải xuống nếu mọi thứ đều thất bại
*/
var PdfViewer = ({ url, fileName = "document.pdf", className, documentId }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const canvasRef = React.useRef(null);
	const [pdfDoc, setPdfDoc] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [numPages, setNumPages] = useState(null);
	const [renderError, setRenderError] = useState(false);
	const renderTaskRef = React.useRef(null);
	const containerRef = useRef(null);
	const [scale, setScale] = useState(1);
	const [isPanMode, setIsPanMode] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({
		x: 0,
		y: 0
	});
	const [scrollStart, setScrollStart] = useState({
		left: 0,
		top: 0
	});
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
		script.async = true;
		document.head.appendChild(script);
		return () => script.remove();
	}, []);
	useEffect(() => {
		let cancelled = false;
		let objectUrl = null;
		const loadPdf = async () => {
			setLoading(true);
			setError(null);
			setPdfUrl(null);
			setRenderError(false);
			try {
				const token = tokenStore.get();
				let blob = null;
				if (documentId) {
					console.log("[PdfViewer] Step 1: Backend download API for doc", documentId);
					try {
						const downloadResp = await fetch(`${API_BASE}/api/documents/${documentId}/download`, {
							method: "GET",
							headers: { Authorization: `Bearer ${token}` }
						});
						if (downloadResp.ok) {
							const ct = downloadResp.headers.get("content-type") || "";
							console.log("[PdfViewer] Download OK:", downloadResp.status, ct);
							if (ct.includes("json")) {
								const data = await downloadResp.json();
								const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
								if (signedUrl) {
									console.log("[PdfViewer] Fetching signed URL...");
									const pdfResp = await fetch(signedUrl, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
									if (pdfResp.ok) {
										const b = await pdfResp.blob();
										console.log("[PdfViewer] Signed URL blob:", b.type, b.size);
										if (b.size > 0) blob = b;
									}
								}
							} else {
								const b = await downloadResp.blob();
								console.log("[PdfViewer] Backend blob:", b.type, b.size);
								if (b.size > 0) blob = b;
							}
						} else console.warn("[PdfViewer] API failed:", downloadResp.status);
					} catch (e) {
						console.warn("[PdfViewer] API error:", e);
					}
				}
				if (!blob) {
					const urlsToTry = [url];
					if (url.includes("/image/upload/")) {
						urlsToTry.push(url.replace("/image/upload/", "/raw/upload/"));
						urlsToTry.push(url + "?fl_attachment=true");
					}
					for (const tryUrl of urlsToTry) {
						console.log("[PdfViewer] Step 2: Trying URL:", tryUrl.substring(0, 80));
						try {
							const directResp = await fetch(tryUrl, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
							if (directResp.ok) {
								const b = await directResp.blob();
								console.log("[PdfViewer] Direct blob:", b.type, b.size, "from:", tryUrl.substring(0, 60));
								if (b.size > 500) {
									blob = b;
									break;
								}
							} else console.warn("[PdfViewer] Fetch status:", directResp.status, "for:", tryUrl.substring(0, 60));
						} catch (e) {
							console.warn("[PdfViewer] Fetch error:", e, "for:", tryUrl.substring(0, 60));
						}
					}
				}
				if (blob && blob.size > 500) {
					objectUrl = URL.createObjectURL(blob);
					setPdfUrl(objectUrl);
					console.log("[PdfViewer] Object URL created, size:", blob.size);
				} else {
					console.error("[PdfViewer] No valid blob, size:", blob?.size);
					throw new Error("Không thể tải PDF");
				}
			} catch (e) {
				console.error("[PdfViewer] Load failed:", e);
				if (!cancelled) setError(e instanceof Error ? e.message : "Không thể tải PDF");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		if (documentId) loadPdf();
		else {
			const fetchDirectly = async () => {
				try {
					const token = tokenStore.get();
					const resp = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
					if (resp.ok) {
						const blob = await resp.blob();
						if (blob.size > 500) {
							objectUrl = URL.createObjectURL(blob);
							setPdfUrl(objectUrl);
						} else setError("PDF file is invalid (too small)");
					} else setError(`Fetch failed: ${resp.status}`);
				} catch (e) {
					setError(e instanceof Error ? e.message : "Không thể tải PDF");
				} finally {
					setLoading(false);
				}
			};
			fetchDirectly();
		}
		return () => {
			cancelled = true;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [url, documentId]);
	useEffect(() => {
		if (!pdfDoc || !canvasRef.current || !window.pdfjsLib) return;
		let cancelled = false;
		const renderPage = async () => {
			try {
				if (renderTaskRef.current) {
					renderTaskRef.current.cancel();
					renderTaskRef.current = null;
				}
				setRenderError(false);
				const page = await pdfDoc.getPage(pageNum);
				const viewport = page.getViewport({ scale });
				const canvas = canvasRef.current;
				if (!canvas) return;
				const context = canvas.getContext("2d");
				if (!context) return;
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				context.fillStyle = "white";
				context.fillRect(0, 0, canvas.width, canvas.height);
				const renderTask = page.render({
					canvasContext: context,
					viewport
				});
				renderTaskRef.current = renderTask;
				await renderTask.promise;
				if (cancelled) return;
				renderTaskRef.current = null;
			} catch (e) {
				if (e?.message?.includes("cancelled")) {
					console.log("[PdfViewer] Render cancelled");
					return;
				}
				console.error("[PdfViewer] Render error:", e);
				if (!cancelled) setRenderError(true);
			}
		};
		renderPage();
		return () => {
			cancelled = true;
			if (renderTaskRef.current) {
				renderTaskRef.current.cancel();
				renderTaskRef.current = null;
			}
		};
	}, [
		pdfDoc,
		pageNum,
		scale
	]);
	useEffect(() => {
		if (!pdfUrl || !window.pdfjsLib) return;
		const pdfjsLib = window.pdfjsLib;
		pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
		const loadDocument = async () => {
			try {
				const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
				setPdfDoc(pdf);
				setNumPages(pdf.numPages);
				setPageNum(1);
			} catch (e) {
				console.error("[PdfViewer] PDF load error:", e);
				setError("Không thể hiển thị PDF. Vui lòng tải xuống để xem.");
			}
		};
		loadDocument();
	}, [pdfUrl]);
	useEffect(() => {
		if (!pdfDoc || !containerRef.current) return;
		const fit = async () => {
			const vp = (await pdfDoc.getPage(pageNum)).getViewport({ scale: 1 });
			const w = containerRef.current.clientWidth - 48;
			setScale(Math.min(Math.max(w / vp.width * .95, .5), 2.5));
		};
		fit();
	}, [pdfDoc, pageNum]);
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const handleWheel = (e) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				setScale((s) => Math.min(Math.max(s + (e.deltaY > 0 ? -.15 : .15), .5), 2.5));
			}
		};
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, []);
	const handleFitToWidth = async () => {
		if (!pdfDoc || !containerRef.current) return;
		const vp = (await pdfDoc.getPage(pageNum)).getViewport({ scale: 1 });
		const w = containerRef.current.clientWidth - 48;
		setScale(Math.min(Math.max(w / vp.width * .95, .5), 2.5));
	};
	const Toolbar = /* @__PURE__ */ jsxs("div", {
		className: "sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [
				/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }),
				/* @__PURE__ */ jsx("span", {
					className: "text-sm font-semibold truncate max-w-[160px]",
					children: fileName
				}),
				numPages && /* @__PURE__ */ jsxs("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: [
						"/ ",
						numPages,
						" trang"
					]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-0.5 flex-wrap",
			children: [
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setIsPanMode(!isPanMode),
					title: isPanMode ? "Chế độ kéo" : "Chế độ chọn",
					className: cn("h-7 w-7 p-0", isPanMode && "bg-accent text-primary"),
					children: isPanMode ? /* @__PURE__ */ jsx(Hand, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(MousePointer2, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-border mx-1" }),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setScale((s) => Math.max(s - .15, .5)),
					disabled: scale <= .5,
					className: "h-7 w-7 p-0",
					title: "Thu nhỏ",
					children: /* @__PURE__ */ jsx(ZoomOut, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsx(Input, {
					type: "number",
					min: 50,
					max: 250,
					value: Math.round(scale * 100),
					onChange: (e) => {
						setScale(Math.min(Math.max(Number(e.target.value) || 50, 50), 250) / 100);
					},
					className: "h-6 w-14 px-1 py-0 text-center text-[11px]"
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setScale((s) => Math.min(s + .15, 2.5)),
					disabled: scale >= 2.5,
					className: "h-7 w-7 p-0",
					title: "Phóng to",
					children: /* @__PURE__ */ jsx(ZoomIn, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: handleFitToWidth,
					className: "h-7 w-7 p-0",
					title: "Vừa khung",
					children: /* @__PURE__ */ jsx(Maximize2, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-border mx-1" }),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setPageNum((p) => Math.max(1, p - 1)),
					disabled: pageNum <= 1,
					className: "h-7 w-7 p-0",
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ jsx(Input, {
						type: "number",
						min: 1,
						max: numPages || 1,
						value: pageNum,
						onChange: (e) => {
							setPageNum(Math.min(Math.max(parseInt(e.target.value) || 1, 1), numPages || 1));
						},
						className: "h-6 w-10 px-1 py-0 text-center text-[11px]"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-[11px] text-muted-foreground",
						children: ["/ ", numPages || "—"]
					})]
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setPageNum((p) => Math.min(numPages || 1, p + 1)),
					disabled: pageNum >= (numPages || 1),
					className: "h-7 w-7 p-0",
					children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" })
				}),
				/* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-border mx-1" }),
				/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "h-7 px-1.5 text-[11px]",
					children: /* @__PURE__ */ jsxs("a", {
						href: url,
						download: true,
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-1" }), "Tải"]
					})
				}),
				/* @__PURE__ */ jsx(Button, {
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
			]
		})]
	});
	if (loading) return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
		children: [Toolbar, /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mb-3" }), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Đang tải PDF..."
			})]
		})]
	});
	if (error) return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col overflow-hidden min-h-0", className),
		children: [Toolbar, /* @__PURE__ */ jsxs("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-red-500 text-center mb-4",
				children: error
			}), /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ jsxs("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }), "Tải xuống"]
				})
			})]
		})]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("flex flex-col min-h-0", className),
		style: { minHeight: "400px" },
		children: [Toolbar, /* @__PURE__ */ jsxs("div", {
			className: "flex-1 relative",
			children: [
				loading && /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 flex items-center justify-center bg-background/50",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
				}),
				error && /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 flex flex-col items-center justify-center p-8",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-red-500 mb-4",
						children: error
					})
				}),
				pdfDoc ? /* @__PURE__ */ jsx("canvas", {
					ref: canvasRef,
					className: "w-full h-full border border-border/50 shadow-lg rounded-lg bg-white",
					style: { display: "block" }
				}) : !loading && !error ? /* @__PURE__ */ jsx("div", {
					className: "h-full flex items-center justify-center",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground",
						children: "Đang chuẩn bị..."
					})
				}) : null
			]
		})]
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
	if (document.status === "PROCESSING") return /* @__PURE__ */ jsx(Card, {
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
	if (document.status === "REJECT") return /* @__PURE__ */ jsx(Card, {
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
