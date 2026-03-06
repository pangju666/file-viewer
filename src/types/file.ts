export type FileDescription = {
  name: string;
  value: string;
};

export type FileItem = {
  id?: string;
  name?: string;
  type?: string;
  mimeType?: string;
  url: string;
  cover?: string;
  createTime?: number | Date;
  size?: number;
  descriptions?: FileDescription[];
};
