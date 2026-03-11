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
import FileItemList from "@/components/FileItemList.vue";

export {
  FileItemList,
  FilePreview,
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

export const install = (app: App) => {
  app.component("FileItemList", FileItemList);
  app.component("FilePreview", FilePreview);
  app.component("FileViewer", FileViewer);
  app.component("AudioViewer", AudioViewer);
  app.component("ErrorViewer", ErrorViewer);
  app.component("ImageViewer", ImageViewer);
  app.component("JsonViewer", JsonViewer);
  app.component("MarkdownViewer", MarkdownViewer);
  app.component("ModelViewer", ModelViewer);
  app.component("OfficeViewer", OfficeViewer);
  app.component("PdfViewer", PdfViewer);
  app.component("TextViewer", TextViewer);
  app.component("UnknownViewer", UnknownViewer);
  app.component("VideoViewer", VideoViewer);
};

export default { install };

export type {
  FileDescription,
  FileItem,
  UrlWithFileEncoding,
  UrlWithFilename,
  OnlyOfficeUrl,
  PdfUrl,
  UrlWithMimeType,
} from "./types/file";

export type {
  FileItemListProps,
  FilePreviewProps,
  AudioViewerProps,
  DxfViewerProps,
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
