import TestJpgFile from "@/assets/file/test.jpg";
import TestDxfFile from "@/assets/file/test.dxf";
import TestGlbFile from "@/assets/file/test.glb";
import Test2DxfFile from "@/assets/file/test2.dxf";
import TestStlFile from "@/assets/file/test.stl";
import TestObjFile from "@/assets/file/test.obj";
import TestMdFile from "@/assets/file/test.md";
import TestTxtFile from "@/assets/file/test.txt";
import TestJsonFile from "@/assets/file/test.json5";
import TestMp3File from "@/assets/file/test.mp3";
import TestMp4File from "@/assets/file/test.mp4";
import TestDocxFile from "@/assets/file/test.docx";
import TestDocFile from "@/assets/file/test.doc";
import TestXlsxFile from "@/assets/file/test.xlsx";
import TestXlsFile from "@/assets/file/test.xls";
import TestPptxFile from "@/assets/file/test.pptx";
import TestPptFile from "@/assets/file/test.ppt";
import TestPdfFile from "@/assets/file/test.pdf";
import type { FileItem } from "@/types/file.ts";

export const supportFileTypes = [
  "kml",
  "MD文档",
  "工程矢量图",
  "PDF文档",
  "图片",
  "视频",
  "音频",
  "模型",
  "OFFICE文档",
  "文本",
  "JSON",
  "未知",
];

export const testFiles: FileItem[] = [
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "application/pdf",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestPdfFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestDocxFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "application/msword",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestDocFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestXlsxFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "application/vnd.ms-excel",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestXlsFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType:
      "iapplication/vnd.openxmlformats-officedocument.presentationml.presentation",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestPptxFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "application/vnd.ms-powerpoint",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestPptFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "image/jpeg",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestJpgFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "image/vnd.dxf",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestDxfFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "model/gltf-binary",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestGlbFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "image/vnd.dxf",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: Test2DxfFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    type: "STL模型",
    mimeType: "model/x.stl-binary",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestStlFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    type: "Obj模型",
    mimeType: "model/obj",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestObjFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "text/x-web-markdown",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestMdFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "text/plain",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestTxtFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "application/json",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestJsonFile,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "audio/mpeg",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestMp3File,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
  {
    name: "测试文件22222222222222222222222222222222222222222222222222222222222222222",
    mimeType: "video/mp4",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: TestMp4File,
    createTime: new Date(),
    size: 10000000,
    descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],
  },
];
