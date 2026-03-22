import type { FileItem, FileType } from "@/types/file.ts";
import type { DxfViewerOptions } from "dxf-viewer";
import Viewer from "viewerjs";
import type { JsonViewerProps } from "vue3-json-viewer";
import type { MdPreviewProps } from "md-editor-v3";
import type { Component } from "vue";

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
  coverHeight?: number;
  coverObjectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  coverFallbackSrc?: string;
  coverFallbackIcon?: Component;
};

export type DxfPreviewOptions = {
  showProgressBar?: boolean;
  showLayerList?: boolean;
  layerListWidth?: number | string;
  fonts?: string[];
  dxfViewerOptions?: DxfViewerOptions;
};

export type ImagePreviewOptions = {
  viewerOptions?: ImageViewerOptions;
};

export type JsonPreviewOptions = {
  contentLoader?: (
    url: string,
    fileEncoding: string,
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
  jsonViewerProps?: JsonViewerOptions;
};

export type MarkdownPreviewOptions = {
  showCatalog?: boolean;
  catalogWidth?: number;
  mdPreviewProps?: MarkdownViewerOptions;
  contentLoader?: (
    url: string,
    fileEncoding: string,
  ) => string | Promise<string>;
};

export type TextPreviewOptions = {
  contentLoader?: (
    url: string,
    fileEncoding: string,
  ) => string | Promise<string>;
};

export type ModelPreviewOptions = {
  showProgressBar?: boolean;
  babylonViewerAttributes?: Record<string, unknown>;
};

export type OfficePreviewOptions = {
  id?: string;
  token?: string;
  mode?: "microsoft" | "onlyOffice";
  region?: string;
  microsoftViewBaseUrl?: string;
  onlyOfficeServerUrl?: string;
};

export type PdfPreviewOptions = {
  id?: string;
  token?: string;
  mode?: "pdfjs" | "onlyOffice";
  region?: string;
  pdfjsViewBaseUrl?: string;
  onlyOfficeServerUrl?: string;
};

export type VideoPreviewOptions = {
  playerOptions?: Record<string, unknown>;
};

export type FileListProps = {
  title?: string;
  data?:
    | FileItem[]
    | Promise<FileItem[]>
    | (() => FileItem[])
    | (() => Promise<FileItem[]>);
  showDescriptions?: boolean;
  showCover?: boolean;
  showTags?: boolean;
  showType?: boolean;
  showBackTop?: boolean;
  showSearch?: boolean;
  showTitle?: boolean;
  showFilter?: boolean;
  coverHeight?: number | string;
  coverObjectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  coverLazy?: boolean;
  coverFallbackSrc?: string;
  coverFallbackIcon?: Component;
  coverPlaceholderSrc?: string;
  coverPlaceholderIcon?: Component;
  cardSize?: "small" | "medium" | "large" | "huge";
  cardHoverable?: boolean;
  cardBordered?: boolean;
  types?:
    | FileType[]
    | Promise<FileType[]>
    | (() => FileType[])
    | (() => Promise<FileType[]>);
  filter?: (file: FileItem, types: string[], keyword?: string) => boolean;
  onLoad?: (
    page: number,
    types: string[],
    keyword?: string,
  ) => Promise<FileItem[]> | FileItem[];
  noMore?: boolean;
  customDownload?: (fileItem: FileItem) => void;
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
  viewerProps?: {
    audio?: AudioPreviewOptions;
    dxf?: DxfPreviewOptions;
    image?: ImagePreviewOptions;
    json?: JsonPreviewOptions;
    markdown?: MarkdownPreviewOptions;
    model?: ModelPreviewOptions;
    office?: OfficePreviewOptions;
    pdf?: PdfPreviewOptions;
    video?: VideoPreviewOptions;
    text?: TextPreviewOptions;
  };
};
