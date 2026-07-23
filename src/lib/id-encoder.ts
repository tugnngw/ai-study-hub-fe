// Encode/decode UUIDs to/from short base64 strings.
// Hides raw UUIDs from URLs without adding dependencies.

const HEX = "0123456789abcdef";

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++)
    bytes[i] = (HEX.indexOf(hex[i * 2]) << 4) | HEX.indexOf(hex[i * 2 + 1]);
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < 16; i++) {
    const b = bytes[i];
    hex += HEX[b >> 4] + HEX[b & 0x0f];
  }
  return hex;
}

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function bytesToBase64(bytes: Uint8Array): string {
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += BASE64_CHARS[b0 >> 2];
    result += BASE64_CHARS[((b0 & 3) << 4) | (b1 >> 4)];
    result += i + 1 < bytes.length ? BASE64_CHARS[((b1 & 15) << 2) | (b2 >> 6)] : "";
    result += i + 2 < bytes.length ? BASE64_CHARS[b2 & 63] : "";
  }
  return result;
}

function base64ToBytes(str: string): Uint8Array {
  const chars = BASE64_CHARS;
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i += 4) {
    const c0 = chars.indexOf(str[i]);
    const c1 = chars.indexOf(str[i + 1] || "A");
    const c2 = chars.indexOf(str[i + 2] || "A");
    const c3 = chars.indexOf(str[i + 3] || "A");
    bytes.push((c0 << 2) | (c1 >> 4));
    if (str[i + 2]) bytes.push(((c1 & 15) << 4) | (c2 >> 2));
    if (str[i + 3]) bytes.push(((c2 & 3) << 6) | c3);
  }
  return new Uint8Array(bytes);
}

/** Encode a UUID string (with or without dashes) to a compact base64 string. */
export function encodeId(uuid: string): string {
  const clean = uuid.replace(/-/g, "");
  if (clean.length !== 32) throw new Error("Invalid UUID: " + uuid);
  return bytesToBase64(hexToBytes(clean));
}

/** Decode a base64 string back to the standard UUID format (with dashes). */
export function decodeId(encoded: string): string {
  const hex = bytesToHex(base64ToBytes(encoded));
  return (
    hex.slice(0, 8) + "-" +
    hex.slice(8, 12) + "-" +
    hex.slice(12, 16) + "-" +
    hex.slice(16, 20) + "-" +
    hex.slice(20, 32)
  );
}
