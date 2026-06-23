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

const CLOUDINARY_HOSTS = [
  'cloudinary.com',
  'res.cloudinary.com',
];

/**
 * Check if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return CLOUDINARY_HOSTS.some(host => urlObj.hostname.includes(host));
  } catch {
    return false;
  }
}

/**
 * Transform Cloudinary URL to ensure it works with iframe or direct fetch
 *
 * For PDFs hosted on Cloudinary under 'image/upload', we need to change to 'raw/upload'
 * to serve the actual PDF file instead of an image thumbnail.
 * For other files, we keep the URL as is (but ensure HTTPS).
 */
export function transformCloudinaryUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null;
  }

  try {
    const urlObj = new URL(url);

    if (!isCloudinaryUrl(url)) {
      return url;
    }

    // Ensure https
    urlObj.protocol = 'https:';

    // If the URL is for an image upload and the file appears to be a PDF,
    // change it to raw upload to get the actual PDF file.
    const pathname = urlObj.pathname;
    if (pathname.includes('/image/upload/') && pathname.toLowerCase().endsWith('.pdf')) {
      const newPathname = pathname.replace('/image/upload/', '/raw/upload/');
      urlObj.pathname = newPathname;
      console.log('[CloudinaryUtils] Converted image/upload to raw/upload for PDF:', {
        original: url,
        transformed: urlObj.toString()
      });
    }

    const transformedUrl = urlObj.toString();
    return transformedUrl;
  } catch (error) {
    console.error('[CloudinaryUtils] Error transforming URL:', error);
    return url;
  }
}

/**
 * Fetch file content from Cloudinary URL and create a Blob
 * This is generally needed for non-PDF types where iframe isn't used,
 * or if direct fetching is preferred.
 */
export async function fetchCloudinaryFile(
  url: string | null | undefined,
  options?: { timeout?: number }
): Promise<Blob | null> {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null;
  }

  const timeout = options?.timeout || 30000;

  try {
    // We need to fetch the file to get its content as a Blob
    // For Cloudinary files, direct fetch might be CORS-blocked.
    // The browser's native fetch might not handle it if not configured correctly.
    // If this fetch fails, we might need to rethink the approach for non-PDFs.
    console.log('[CloudinaryUtils] Fetching file from:', url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      },
      signal: controller.signal,
      mode: 'cors', // Explicitly request CORS
      credentials: 'omit', // Don't send credentials for Cloudinary
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log('[CloudinaryUtils] File fetched successfully:', {
      url,
      size: blob.size,
      type: blob.type
    });

    return blob;
  } catch (error) {
    console.error('[CloudinaryUtils] Error fetching file:', {
      url,
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

/**
 * Create an object URL from a fetched file (Blob)
 */
export async function createCloudinaryBlobUrl(
  cloudinaryUrl: string | null | undefined
): Promise<string | null> {
  const blob = await fetchCloudinaryFile(cloudinaryUrl);
  if (!blob) {
    return null;
  }

  const objectUrl = URL.createObjectURL(blob);
  console.log('[CloudinaryUtils] Created object URL:', objectUrl);

  return objectUrl;
}

/**
 * Clean up an object URL created with createCloudinaryBlobUrl
 */
export function cleanupBlobUrl(objectUrl: string | null | undefined) {
  if (objectUrl && objectUrl.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(objectUrl);
      console.log('[CloudinaryUtils] Cleaned up blob URL:', objectUrl);
    } catch (error) {
      console.error('[CloudinaryUtils] Error cleaning up blob URL:', error);
    }
  }
}