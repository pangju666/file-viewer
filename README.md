[中文](README.md) | [English](README_EN.md)

<p align="center">
  <a href="https://github.com/pangju666/file-viewer/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/pangju666/file-viewer.svg?style=flat-square&include_prereleases" />
  </a>

  <a href="https://www.apache.org/licenses/LICENSE-2.0">
    <img alt="code style" src="https://img.shields.io/badge/license-Apache%202-4EB1BA.svg?style=flat-square">
  </a>
</p>

# 介绍

简单封装的文件预览服务，通过nginx部署到本地后，可以作为服务使用参数来访问

# 使用说明

## 本地预览

```
npm run dev
```

## 打包部署

```
npm run build
将dist目录部署到nginx即可
```

# 使用示例

```
127.0.0.1:5173?url={文件url}&type={文件mime-type}&name={文件名}
```

| 参数   | 说明    | 必填 | URL编码 | 示例                          | 备注           |
|------|-------|----|-------|-----------------------------|--------------|
| url  | 文件url | 是  | 是     | http://xxxx.com/xxxxxx.jpeg | 最好是公网链接      |
| type | 文件类型  | 否  | 是     | image/jpeg                  | 不传的话会下载文件推导  |
| name | 文件名   | 否  | 是     | demo.jpg                    | 不传的话则默认为null |

# 文件类型

## 特殊类型注意事项

### OFFICE

- 需要部署[onlyOffice](https://www.onlyoffice.com/zh/download-community.aspx)，否则调用微软的在线文档预览服务
- **name**参数、**type**为必填

### PDF

- 需要部署**pdfjs**，将**lib**包中的**pdfjs**目录通过**nginx**部署
- 配置.env文件中的**VITE_PDF_VIEWER_URL**值，配置为部署后的域名地址
- 将以下代码解注释

```javascript
  /*if (mimeType.value === "application/pdf") {
  location.href = `${
            import.meta.env.VITE_PDF_VIEWER_URL
        }?file=${encodeURIComponent(fileUrl.value)}`;
  }*/
```

### KML

- 配置.env文件中的**VITE_CESIUM_TOKEN**值，配置为自己[Cesium](https://ion.cesium.com/tokens?page=1)账号的**TOKEN**

### 全景图

- 增加sphere参数为true，例如 127.0.0.1:5173?url={文件url}&type={文件mime-type}&name={文件名}&sphere=true
- file url 格式修改为：{左侧切片图片地址},{前侧切片图片地址},{右侧切片图片地址},{后侧切片图片地址},{上侧切片图片地址},{下侧切片图片地址}
- 六个方向的图片地址要用,分隔

### OBJ模型

- file url 为模型root地址，例如：http://xxxxx.com/{文件md5}
  - 结构地址：http://xxxxx.com/{文件md5}/{文件名称}.obj
  - 材质地址：http://xxxxx.com/{文件md5}/{文件名称}.mtl
  - 贴图地址：http://xxxxx.com/{文件md5}/{文件名称}.jpeg
- **name**参数、**type**为必填

## 支持文件类型

| 文件类型                                                                      | 文件后缀     | 分类    |
|---------------------------------------------------------------------------|----------|-------|
| application/vnd.openxmlformats-officedocument.wordprocessingml.document   | docx     | 文档    |
| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         | xlsx     | 文档    |
| application/vnd.openxmlformats-officedocument.presentationml.presentation | pptx     | 文档    |
| application/msword                                                        | doc      | 文档    |
| application/vnd.ms-excel                                                  | xls      | 文档    |
| application/vnd.ms-powerpoint                                             | ppt      | 文档    |
| audio/mpeg                                                                | mp3      | 音频    |
| audio/wav                                                                 | wav      | 音频    |
| audio/ogg                                                                 | ogg      | 音频    |
| audio/x-aac                                                               | aac      | 音频    |
| audio/x-flac                                                              | flac     | 音频    |
| video/mp4                                                                 | mp4      | 视频    |
| video/ogg                                                                 | ogg      | 视频    |
| video/webm                                                                | webm     | 视频    |
| model/obj                                                                 | obj      | 模型    |
| model/gltf-binary                                                         | glb      | 模型    |
| model/x.stl-binary                                                        | stl      | 模型    |
| text/x-web-markdown                                                       | md       | 文档    |
| application/vnd.google-earth.kml+xml                                      | kml      | 地理文件  |
| image/vnd.dxf                                                             | dxf      | 工程设计图 |
| application/json                                                          | json     | 文本    |
| text/*                                                                    | txt      | 图像    |
| image/jpeg                                                                | jpeg、jpg | 图像    |
| image/png                                                                 | png      | 图像    |
| image/gif                                                                 | gif      | 图像    |
| image/webp                                                                | webp     | 图像    |
| image/svg+xml                                                             | svg      | 图像    |
