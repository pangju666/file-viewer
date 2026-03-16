export type FileSource = string | File | Blob;

export type FileType =
  | {
      label: string;
      value: string;
    }
  | string;

export type FileTag = { value: string; type?: string } | string;

export type FileItem = {
  file: FileSource;
  mimeType: string;
  id?: string;
  name?: string;
  type?: FileType;
  cover?: string;
  size?: number;
  tags?: string[] | FileTag[];
  descriptions?: { name: string; value: string }[];
};

export type UrlWithMimeType = {
  url: string;
  mimeType: string;
};

export type UrlWithFileEncoding = {
  url: string;
  fileEncoding?: string;
};

export type OnlyOfficeUrl = UrlWithMimeType & {
  key: string;
};
