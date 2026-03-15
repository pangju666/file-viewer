import type { FileItem } from "@/types/file.ts";
import type { DxfViewerOptions } from "dxf-viewer";
import Viewer from "viewerjs";
import type { JsonViewerProps } from "vue3-json-viewer";
import type { MdPreviewProps } from "md-editor-v3";

export type ViewerError =
  | string
  | Event
  | Error
  | MediaError
  | { errorCode: number; errorDescription: string };

export type ImageViewerOptions = Omit<
  Viewer.Options,
  "inline" | "navbar" | "button"
>;

export type JsonViewerOptions = Omit<JsonViewerProps, "value">;

export type MarkdownViewerOptions = Omit<
  MdPreviewProps,
  "id" | "modelValue" | "editorId"
>;

export type AudioPreviewOptions = {
  autoplay?: boolean;
  controls?: boolean;
};

export type DxfPreviewOptions = {
  showLayerList?: boolean;
  layerListWidth?: number | string;
  fonts?: string[];
  viewerOptions?: DxfViewerOptions;
};

export type ImagePreviewOptions = {
  viewerOptions?: ImageViewerOptions;
};

export type JsonPreviewOptions = {
  viewerOptions?: JsonViewerOptions;
};

export type MarkdownPreviewOptions = {
  showCatalog?: boolean;
  catalogWidth?: string | number;
  id?: string;
  viewerOptions?: MarkdownViewerOptions;
};

export type ModelPreviewOptions = {
  viewerOptions?: Record<string, unknown>;
};

export type OfficePreviewOptions = {
  mode?: "microsoft" | "onlyOffice";
  language?: string;
  microsoftViewBaseUrl?: string;
  onlyOfficeApiJsUrl?: string;
};

export type PdfPreviewOptions = {
  pdfjsViewerUrl?: string;
};

export type VideoPreviewOptions = {
  viewerOptions?: Record<string, unknown>;
};

export type FileListProps = {
  title?: string;
  staticFileList?: FileItem[];
  showSkeleton?: boolean;
  showBackTop?: boolean;
  showSearch?: boolean;
  showTitle?: boolean;
  showTypeFilter?: boolean;
  coverHeight?: number | string;
  coverObjectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  fileTypes?: string[];
  fileMatcher?: (file: FileItem, types?: string[], keyword?: string) => boolean;
  load?: (
    page: number,
    types?: string[],
    keyword?: string,
  ) => Promise<FileItem[]> | FileItem[];
  noMore?: boolean;
};

export type FilePreviewProps = {
  enableImage?: boolean;
  enableVideo?: boolean;
  enableAudio?: boolean;
  enablePdf?: boolean;
  enableOffice?: boolean;
  enableModel?: boolean;
  enableMarkdown?: boolean;
  enableText?: boolean;
  enableJson?: boolean;
  enableDxf?: boolean;
  customViewerMatcher?: string[] | ((file: FileItem) => boolean);
  jsonContentLoader?: (
    url: string,
    encoding?: string,
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
  textContentLoader?: (
    url: string,
    encoding?: string,
  ) => string | Promise<string>;
  markdownContentLoader?: (
    url: string,
    encoding?: string,
  ) => string | Promise<string>;
  viewerOptions?: {
    audio?: AudioPreviewOptions;
    dxf?: DxfPreviewOptions;
    image?: ImagePreviewOptions;
    json?: JsonPreviewOptions;
    markdown?: MarkdownPreviewOptions;
    model?: ModelPreviewOptions;
    office?: OfficePreviewOptions;
    pdf?: PdfPreviewOptions;
    video?: VideoPreviewOptions;
  };
};
