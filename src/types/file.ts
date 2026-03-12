export type FileDescription = {
  name: string;
  value: string;
};

export type FileItem = {
  id?: string;
  name?: string;
  type?: string;
  filename?: string;
  mimeType: string;
  url: string;
  cover?: string;
  createTime?: number | Date;
  size?: number;
  descriptions?: FileDescription[];
};

export type UrlWithMimeType = {
  url: string;
  mimeType: string;
};

export type UrlWithFilename = {
  url: string;
  filename?: string;
};

export type UrlWithFileEncoding = {
  url: string;
  fileEncoding?: string;
};

export type OnlyOfficeUrl = UrlWithMimeType & {
  title?: string;
  key?: string;
};
