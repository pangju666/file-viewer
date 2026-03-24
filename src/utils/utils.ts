import { textMimeTypePrefix, utf8Charset } from "@/utils/constants";
import type { UrlWithFileEncoding, UrlWithMimeType } from "@/types/file.ts";

export async function getResult<T>(
  value: T | Promise<T> | (() => T) | (() => Promise<T>),
): Promise<T> {
  if (typeof value === "function") {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = (value as () => T | Promise<T>)();
      if (result instanceof Promise) {
        return await result;
      }
      return result as T;
    } catch (error) {
      throw error;
    }
  }

  if (value instanceof Promise) {
    return await value;
  }
  return value as T;
}

export function isTargetMimeType(
  targetMimeType: string,
  fileMimeType?: string,
): boolean {
  return (
    fileMimeType === targetMimeType ||
    (fileMimeType ?? "").startsWith(`${targetMimeType};`)
  );
}

export function isTextMimeType(fileMimeType?: string): boolean {
  if (typeof fileMimeType === "string") {
    return fileMimeType.startsWith(textMimeTypePrefix);
  }
  return false;
}

export function getSrcFromUrl(
  src: UrlWithFileEncoding | UrlWithMimeType | string,
) {
  if (typeof src === "string") {
    return src;
  }
  return src.url;
}

export function getFileEncodingFromUrl(
  src: UrlWithFileEncoding | string,
  defaultEncoding = utf8Charset,
) {
  if (typeof src === "string") {
    return utf8Charset;
  }
  if (src.fileEncoding) {
    return src.fileEncoding;
  }
  return defaultEncoding;
}
