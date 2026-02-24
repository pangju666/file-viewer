import {
  audioMimeTypes,
  babylonSupportedTypes,
  dxfMimeType,
  imageMimeTypes,
  jsonMimeTypePrefix,
  kmlMimType,
  markdownMimType,
  officeMimeTypes,
  pdfMimeType,
  textMimeTypePrefix,
  videoMimeTypes,
} from "@/utils/constants";
import { format } from "date-fns";

export const DEFAULT_TEXT = "暂无";

export function convertDecimalToDMS(decimal: number) {
  const degrees = Math.floor(decimal);
  const minutes = Math.floor((decimal - degrees) * 60);
  const seconds = ((decimal - degrees - minutes / 60) * 3600).toFixed(2);
  return `${degrees}°${minutes}'${seconds}"`;
}

export async function getResult(value: unknown) {
  if (value instanceof Function) {
    const result = value();
    if (result instanceof Promise) {
      return await result;
    } else {
      return result;
    }
  } else {
    if (value instanceof Promise) {
      return await value;
    } else {
      return value;
    }
  }
}

export function getValueType(value: unknown, nullType = "string") {
  if (value == null) {
    return nullType;
  } else if (value === true || value === false) {
    return "boolean";
  } else if (!isNaN(value as number) && typeof value === "number") {
    return "number";
  } else if (typeof value === "object") {
    return "object";
  } else {
    return "string";
  }
}

export function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function copyToClipboard(
  text: string,
  successCallback:
    | ((value: void) => PromiseLike<void> | void)
    | undefined
    | null,
  failureCallback:
    | ((value: void) => PromiseLike<void> | void)
    | undefined
    | null,
) {
  if (!navigator.clipboard) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    successCallback?.();
  } else {
    navigator.clipboard.writeText(text).then(successCallback, failureCallback);
  }
}

export function downloadFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.click();
  a.remove();
}

export function defaultTextIfBlank(text: string, defaultText = DEFAULT_TEXT) {
  return (text ?? "").trim() || defaultText;
}

export function formatDateTime(date: string | number | Date) {
  if (date == null) {
    return DEFAULT_TEXT;
  }
  return format(date, "yyyy-MM-dd HH:mm::ss");
}

export function formatDate(date: string | number | Date) {
  if (date == null) {
    return DEFAULT_TEXT;
  }
  return format(date, "yyyy-MM-dd");
}

export function formatFileSize(fileSize: number) {
  const num = 1024.0;
  if (fileSize < num) {
    return fileSize + "B";
  }
  if (fileSize < Math.pow(num, 2)) {
    return (fileSize / num).toFixed(2) + "KB";
  }
  if (fileSize < Math.pow(num, 3)) {
    return (fileSize / Math.pow(num, 2)).toFixed(2) + "MB";
  }
  if (fileSize < Math.pow(num, 4)) {
    return (fileSize / Math.pow(num, 3)).toFixed(2) + "G";
  }
  return (fileSize / Math.pow(num, 4)).toFixed(2) + "T";
}

export const formatFileType = (mimeType: string) => {
  if (mimeType === kmlMimType) {
    return "kml";
  } else if (mimeType === markdownMimType) {
    return "MD文档";
  } else if (mimeType === dxfMimeType) {
    return "工程矢量图";
  } else if (mimeType === pdfMimeType) {
    return "PDF文档";
  } else if (imageMimeTypes.includes(mimeType)) {
    return "图片";
  } else if (videoMimeTypes.includes(mimeType)) {
    return "视频";
  } else if (audioMimeTypes.includes(mimeType)) {
    return "音频";
  } else if (babylonSupportedTypes.includes(mimeType)) {
    return "模型";
  } else if (officeMimeTypes.includes(mimeType)) {
    return "OFFICE文档";
  } else if (mimeType.startsWith(textMimeTypePrefix)) {
    return "文本";
  } else if (mimeType.startsWith(jsonMimeTypePrefix)) {
    return "JSON";
  } else {
    return "未知";
  }
};

export function toTree<T extends Record<string, unknown>>(
  source: T[],
  options = {
    key: "id",
    parentKey: "parentId",
    childrenKey: "children",
  },
  rootKey: unknown = null,
  convertFunc: ((node: T) => void) | null = null,
) {
  if (!Array.isArray(source) || source.length === 0) {
    return [];
  }

  // 创建新节点副本，避免修改原始数据
  const map = new Map<unknown, T>();
  const tree: T[] = [];

  // 第一次遍历：创建所有节点的副本，并初始化 children
  for (const item of source) {
    const node: T = {
      ...item,
      [options.childrenKey]: [],
    };

    if (convertFunc) {
      convertFunc(node);
    }

    map.set(node[options.key], node);
  }

  // 第二次遍历：建立父子关系
  for (const item of source) {
    const node = map.get(item[options.key])!;
    const parentKey = item[options.parentKey];

    if (parentKey === rootKey) {
      tree.push(node);
    } else {
      const parentNode = map.get(parentKey);
      if (parentNode) {
        (parentNode[options.childrenKey] as T[]).push(node);
      }
    }
  }

  return tree;
}
