import type { FileItem } from "@/types/file.ts";

import Dxf3DFile from "@/assets/file/3d.DXF";

export const testFiles: FileItem[] = [
  /* PDF */
  {
    name: "Sample A4 PDF",
    type: "PDF文档",
    filename: "sample-a4.pdf",
    mimeType: "application/pdf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/pdf/sample-a4.pdf",
    createTime: new Date(),
    size: 10000000,
    /*descriptions: [
      {
        name: "描述",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        name: "描述2",
        value: "测试用文件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ],*/
  },
  {
    name: "Sample PDF with fit size images",
    type: "PDF文档",
    filename: "sample-images-fit.pdf",
    mimeType: "application/pdf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/pdf/sample-images-fit.pdf",
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
    name: "Sample Multilingual Texts PDF",
    type: "PDF文档",
    filename: "sample-multilingual-text.pdf",
    mimeType: "application/pdf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/pdf/sample-multilingual-text.pdf",
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
  /* 图像*/
  {
    name: "Monalisa 1200x1200",
    type: "图像",
    filename: "monalisa-1200x1200.jpg",
    mimeType: "image/jpeg",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/jpg/monalisa-1200x1200.jpg",
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
    name: "Monalisa 1200x1200",
    type: "图像",
    filename: "monalisa-1200x1200.png",
    mimeType: "image/png",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/png/monalisa-1200x1200.png",
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
    name: "Sample 2",
    type: "图像",
    filename: "sample-2.gif",
    mimeType: "image/gif",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/gif/sample-2.gif",
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
    name: "Animated Earth",
    type: "图像",
    filename: "earth.gif",
    mimeType: "image/gif",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/gif/earth.gif",
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
    name: "Sample Logo",
    type: "图像",
    filename: "sample-cat.svg",
    mimeType: "image/svg+xml",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/svg/sample-cat.svg",
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
    name: "Cat Face",
    type: "图像",
    filename: "cat-face.svg",
    mimeType: "image/svg+xml",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/svg/cat-face.svg",
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
    name: "Hugging Face",
    type: "图像",
    filename: "hugging-face.svg",
    mimeType: "image/svg+xml",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/svg/hugging-face.svg",
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
    name: "Animated",
    type: "图像",
    filename: "animated.webp",
    mimeType: "image/webp",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/webp/animated.webp",
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
    name: "Monalisa 1200x1200",
    type: "图像",
    filename: "monalisa-1200x1200.webp",
    mimeType: "image/webp",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/webp/monalisa-1200x1200.webp",
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
    name: "Monalisa 1200x1200",
    type: "图像",
    filename: "monalisa-1200x1200.tiff",
    mimeType: "image/tiff",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/tiff/monalisa-1200x1200.tiff",
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
  /* 音频 */
  {
    name: "Suzume No Tojimari",
    type: "音频",
    filename: "suzume_no_tojimari.mp3",
    mimeType: "audio/mpeg",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/mp3/suzume_no_tojimari.mp3",
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
    name: "Example 4",
    type: "音频",
    filename: "file_example_MP3_5MG.mp3",
    mimeType: "audio/mpeg",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/mp3/file_example_MP3_5MG.mp3",
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
    name: "Suzume No Tojimari",
    type: "音频",
    filename: "suzume_no_tojimari.wav",
    mimeType: "audio/wav",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/wav/suzume_no_tojimari.wav",
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
    name: "Suzume No Tojimari",
    type: "音频",
    filename: "suzume_no_tojimari.ogg",
    mimeType: "audio/ogg",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/ogg-audio/suzume_no_tojimari.ogg",
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
    name: "Suzume No Tojimari",
    type: "音频",
    filename: "suzume_no_tojimari.flac",
    mimeType: "audio/flac",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/flac/suzume_no_tojimari.flac",
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
  /* 视频 */
  {
    name: "Full HD 1920x1080 (Seawater, drone view video, 30 FPS)",
    type: "视频",
    filename: "1416529-hd_1920_1080_30fps.mov",
    mimeType: "video/quicktime",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/mov/1416529-hd_1920_1080_30fps.mov",
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
    name: "Full HD 1920x1080 (Seawater, drone view video, 30 FPS)",
    type: "视频",
    filename: "1416529-hd_1920_1080_30fps.mp4",
    mimeType: "video/mp4",
    cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/mp4/1416529-hd_1920_1080_30fps.mp4",
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
    name: "Full HD 1920x1080 (Seawater, drone view video, 30 FPS)",
    type: "视频",
    filename: "1416529-hd_1920_1080_30fps.ogg",
    mimeType: "video/ogg",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/ogg/1416529-hd_1920_1080_30fps.ogg",
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
    name: "Full HD 1920x1080 (Seawater, drone view video, 30 FPS)",
    type: "视频",
    filename: "1416529-hd_1920_1080_30fps.wmv",
    mimeType: "video/x-ms-wmv",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/wmv/1416529-hd_1920_1080_30fps.wmv",
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
    name: "Full HD 1920x1080 (Seawater, drone view video, 30 FPS)",
    type: "视频",
    filename: "1416529-hd_1920_1080_30fps.webm",
    mimeType: "video/webm",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/webm/1416529-hd_1920_1080_30fps.webm",
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
  /* OFFICE */
  {
    name: "Sample DOC",
    type: "OFFICE文档",
    filename: "sample5.doc",
    mimeType: "application/msword",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/docx/sample5.doc",
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
    name: "Sample DOCX 4",
    type: "OFFICE文档",
    filename: "sample4.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/docx/sample4.docx",
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
    name: "Sample XLS 1",
    type: "OFFICE表格",
    filename: "sample1.xls",
    mimeType: "application/vnd.ms-excel",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/xlsx/sample1.xls",
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
    name: "Sample XLSX 2",
    type: "OFFICE表格",
    filename: "sample1.xls",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/xlsx/sample2.xlsx",
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
    name: "Sample PPT",
    type: "OFFICE演示文档",
    filename: "file_example_PPT_1MB.ppt",
    mimeType: "application/vnd.ms-powerpoint",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/pptx/file_example_PPT_1MB.ppt",
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
    name: "Sample PPTX 2 (with image)",
    type: "OFFICE演示文档",
    filename: "sample2.pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/pptx/sample2.pptx",
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
  /* JSON */
  {
    name: "Sample 1",
    type: "JSON",
    filename: "sample-1.json",
    mimeType: "application/json",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/json/sample-1.json",
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
    name: "Sample 2",
    type: "JSON",
    filename: "sample-2.json",
    mimeType: "application/json",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://disk.sample.cat/samples/json/sample-2.json",
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
  /* MD */
  {
    name: "Markdown示例文件",
    type: "文档",
    filename: "Markdown-Demo.md",
    mimeType: "text/x-web-markdown",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://gist.githubusercontent.com/AlanDecode/7d31f3fac75b698ff1fa67240c56832b/raw/a75fc70d9e3efad92d67f009159add5c4ca2802d/Markdown-Demo.md",
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
    name: "README",
    type: "文档",
    filename: "README.md",
    mimeType: "text/x-web-markdown",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://raw.githubusercontent.com/JeremyHeleine/Photo-Sphere-Viewer/refs/heads/master/README.md",
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
  /* TEXT */
  {
    name: "Markdown示例文件",
    type: "文本",
    filename: "Markdown-Demo.md",
    mimeType: "text/plain",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://gist.githubusercontent.com/AlanDecode/7d31f3fac75b698ff1fa67240c56832b/raw/a75fc70d9e3efad92d67f009159add5c4ca2802d/Markdown-Demo.md",
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
    name: "README",
    type: "文本",
    filename: "README.md",
    mimeType: "text/plain",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://raw.githubusercontent.com/JeremyHeleine/Photo-Sphere-Viewer/refs/heads/master/README.md",
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
  /* 模型 */
  {
    name: "Male",
    type: "模型",
    filename: "male02.obj",
    mimeType: "model/obj",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://threejs.org/examples/models/obj/male02/male02.obj",
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
    name: "Slotted Disk",
    type: "模型",
    filename: "slotted_disk.stl",
    mimeType: "model/x.stl-binary",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://threejs.org/examples/models/stl/ascii/slotted_disk.stl",
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
    name: "Astronaut",
    type: "模型",
    filename: "Astronaut.glb",
    mimeType: "model/gltf-binary",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    name: "Reflective Sphere",
    type: "模型",
    filename: "reflective-sphere.gltf",
    mimeType: "model/gltf+json",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://modelviewer.dev/shared-assets/models/reflective-sphere.gltf",
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
  /* DXF */
  {
    name: "DEMO",
    type: "矢量图",
    filename: "demo.dxf",
    mimeType: "image/vnd.dxf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://raw.githubusercontent.com/gdsestimating/three-dxf/refs/heads/master/sample/data/demo.dxf",
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
    name: "Api Cw750 Details",
    type: "矢量图",
    filename: "api-cw750-details.dxf",
    mimeType: "image/vnd.dxf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://raw.githubusercontent.com/gdsestimating/dxf-parser/refs/heads/master/samples/data/api-cw750-details.dxf",
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
    name: "3D Demo",
    type: "矢量图",
    filename: "3d.dxf",
    mimeType: "image/vnd.dxf",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: Dxf3DFile,
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
  /* KML */
  {
    name: "Test KML",
    type: "KML",
    filename: "test.kml",
    mimeType: "application/vnd.google-earth.kml+xml",
    //cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    url: "https://raw.githubusercontent.com/gdsestimating/dxf-parser/refs/heads/master/samples/data/api-cw750-details.dxf",
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
