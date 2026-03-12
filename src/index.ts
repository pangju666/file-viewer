import type { App } from "vue";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
import JsonViewer from "@/components/viewer/JsonViewer.vue";
import ImageViewer from "@/components/viewer/ImageViewer.vue";
import VideoViewer from "@/components/viewer/VideoViewer.vue";
import AudioViewer from "@/components/viewer/AudioViewer.vue";
import ModelViewer from "@/components/viewer/ModelViewer.vue";
import UnknownViewer from "@/components/viewer/UnknownViewer.vue";
import PdfViewer from "@/components/viewer/PdfViewer.vue";
import MarkdownViewer from "@/components/viewer/MarkdownViewer.vue";
import TextViewer from "@/components/viewer/TextViewer.vue";
import ErrorViewer from "@/components/viewer/ErrorViewer.vue";
import OfficeViewer from "@/components/viewer/OfficeViewer.vue";
import FileViewer from "@/components/FileViewer.vue";
import FilePreview from "@/components/FilePreview.vue";
import FileList from "@/components/FileList.vue";
import FilePreviewBase from "@/components/FilePreviewBase.vue";

export {
  FileList,
  FilePreview,
  FilePreviewBase,
  FileViewer,
  AudioViewer,
  DxfViewer,
  ErrorViewer,
  ImageViewer,
  JsonViewer,
  MarkdownViewer,
  ModelViewer,
  OfficeViewer,
  PdfViewer,
  TextViewer,
  UnknownViewer,
  VideoViewer,
};

export const install = <T extends App>(app: T): void => {
  app.component("FileList", FileList);
  app.component("FilePreviewBase", FilePreviewBase);
  app.component("FilePreview", FilePreview);
  app.component("FileViewer", FileViewer);
};

export default install;

export type {
  FileDescription,
  FileItem,
  UrlWithFileEncoding,
  UrlWithFilename,
  OnlyOfficeUrl,
  UrlWithMimeType,
} from "./types/file";

export type {
  FileListProps,
  FilePreviewProps,
  AudioViewerProps,
  DxfViewerProps,
  PdfViewerProps,
  ViewerError,
  OfficeViewerProps,
} from "./types/viewer";

export {
  supportedOfficeMimeTypes,
  dxfMimeType,
  supportedModelTypes,
  supportedVideoMimeTypes,
  supportedImageMimeTypes,
  pdfMimeType,
  supportedAudioMimeTypes,
  jsonMimeType,
  mimeTypeWithCharsetRegex,
  utf8Charset,
  markdownMimType,
  textMimeTypePrefix,
} from "./utils/constants.ts";

export {
  getResult,
  getSrcFromUrl,
  getFileEncodingFromUrl,
  downloadFile,
  getMimeTypeCharset,
  isTargetMimeType,
  formatFileSize,
} from "./utils/utils.ts";
