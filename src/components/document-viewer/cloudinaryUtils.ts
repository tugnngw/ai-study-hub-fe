/**
 * Cloudinary URL utilities
 */

const CLOUDINARY_HOSTS = [
  'cloudinary.com',
  'res.cloudinary.com',
];

export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string' || url.trim() === '') return false;
  try {
    const urlObj = new URL(url);
    return CLOUDINARY_HOSTS.some(host => urlObj.hostname.includes(host));
  } catch {
    return false;
  }
}

/**
 * Fetch file content from Cloudinary URL.
 * Sửa lỗi bằng cách thêm `fl_attachment=false` vào query string nếu cần.
 */
export async function fetchCloudinaryFile(
    url: string | null | undefined,
    options?: { timeout?: number }
): Promise<Blob | null> {
  if (!url || typeof url !== 'string' || url.trim() === '') return null;

  const timeout = options?.timeout || 30000;
  let targetUrl = url;

  // Thêm fl_attachment=false đúng cách (dùng URL object)
  if (isCloudinaryUrl(url)) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('fl_attachment', 'false');
      targetUrl = urlObj.toString();
    } catch {
      // Fallback nếu lỗi parse URL
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: { 'Accept': '*/*' },
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    return await response.blob();
  } catch (error) {
    console.error('[CloudinaryUtils] Error fetching file:', error);
    return null;
  }
}