import type { App, Plugin } from "vue";
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

export {
  FileList,
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

const install = (app: App): void => {
  app.component("AudioViewer", AudioViewer);
  app.component("DxfViewer", DxfViewer);
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
  app.component("FileList", FileList);
  app.component("FilePreview", FilePreview);
  app.component("FileViewer", FileViewer);
};

export default install as Plugin;

export type {
  FileSource,
  FileType,
  FileTag,
  FileItem,
  UrlWithFileEncoding,
  OnlyOfficeUrl,
  PdfUrl,
  UrlWithMimeType,
} from "./types/file";

export type {
  ImageViewerOptions,
  JsonViewerOptions,
  MarkdownViewerOptions,
  AudioPreviewOptions,
  DxfPreviewOptions,
  ImagePreviewOptions,
  JsonPreviewOptions,
  MarkdownPreviewOptions,
  ModelPreviewOptions,
  OfficePreviewOptions,
  PdfPreviewOptions,
  VideoPreviewOptions,
  TextPreviewOptions,
  FileListProps,
  FilePreviewProps,
} from "./types/options.ts";

export {
  undefinedSourceMessage,
  undefinedMimeTypeMessage,
  filenameAlphabet,
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
  formatFileSize,
} from "./utils/utils.ts";
