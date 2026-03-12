import type { FileItem } from "@/types/file.ts";
import type { DxfViewerOptions } from "dxf-viewer";
import Viewer from "viewerjs";
import type {
  PageScale,
  Theme,
  ToolbarConfig,
  ToolbarIdConfig,
} from "vue3-pdf-app/dist/types/types";

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

export type AudioViewerProps = {
  autoplay?: boolean;
  controls?: boolean;
};

export type DxfViewerProps = {
  showLayerSider?: boolean;
  layerSiderWidth?: number | string;
  fileEncoding?: string;
  fonts?: string[];
  options?: DxfViewerOptions;
};

export type OfficeViewerProps = {
  mode?: "microsoft" | "onlyOffice";
  language?: string;
  microsoftViewBaseUrl?: string;
  onlyOfficeApiJsUrl?: string;
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
  jsonFetcher?: (
    url: string,
    encoding?: string,
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
  textFetcher?: (url: string, encoding?: string) => string | Promise<string>;
  markdownFetcher?: (
    url: string,
    encoding?: string,
  ) => string | Promise<string>;
  options?: {
    audio?: AudioViewerProps;
    pdf?: PdfViewerProps;
    dxf?: DxfViewerProps;
    image?: Viewer.Options;
    json?: Record<string, unknown>;
    markdown?: Record<string, unknown>;
    model?: Record<string, unknown>;
    office?: OfficeViewerProps;
    video?: Record<string, unknown>;
  };
};

export type PdfViewerProps = {
  showTitle?: boolean;
  theme?: Theme;
  pageScale?: PageScale;
  pageNumber?: number;
  config?: ToolbarConfig;
  idConfig?: ToolbarIdConfig;
};

export type ViewerError =
  | string
  | Event
  | Error
  | MediaError
  | { errorCode: number; errorDescription: string };
