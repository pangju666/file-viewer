[中文](README.md) | [English](README_EN.md)

<p align="center">
  <a href="https://github.com/pangju666/file-viewer/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/pangju666/file-viewer.svg?style=flat-square&include_prereleases" />
  </a>

  <a href="https://www.apache.org/licenses/LICENSE-2.0">
    <img alt="code style" src="https://img.shields.io/badge/license-Apache%202-4EB1BA.svg?style=flat-square">
  </a>
</p>

# Description

A highly integrated file preview component built with Vue 3 and Naive UI, designed to consolidate various common format previewing capabilities into a unified and highly customizable user experience.

# Usage

## Preview

```
npm run dev
```

## Packaged

```
npm run build
Deploy the dist directory to nginx
```

# Example

```
127.0.0.1:5173?url={file url}&type={file mime-type}&name={filename}
```

| parameter | description    | required | URL encoding | example                     | remark                                                     |
|-----------|----------------|----------|--------------|-----------------------------|------------------------------------------------------------|
| url       | file url       | yes      | yes          | http://xxxx.com/xxxxxx.jpeg | preferably a public network link                           |
| type      | file mime-type | no       | yes          | image/jpeg                  | If you don't send it, you will download the file to derive |
| name      | filename       | no       | yes          | demo.jpg                    | If it is not transmitted, it will default to null          |

# File Type

## Special type considerations

### OFFICE

- [onlyOffice](https://www.onlyoffice.com/zh/download-community.aspx) needs to be deployed, otherwise call
Microsoft's online document preview service
- The **name**、**type** parameter is required

### PDF

- You need to deploy PDFJS, and deploy the PDFJS directory in the lib package through nginx
- Configure the VITE_PDF_VIEWER_URL value in the .env file to the domain name address after deployment
- delete comment the following code

```javascript
  /*if (mimeType.value === "application/pdf") {
  location.href = `${
            import.meta.env.VITE_PDF_VIEWER_URL
        }?file=${encodeURIComponent(fileUrl.value)}`;
  }*/
```

### KML

- Configure the VITE_CESIUM_TOKEN value in the .env file，Configure your own [Cesium](https://ion.cesium.com/tokens?page=1)
  account as a **TOKEN**

### Panorama

- Set the sphere parameter to true, for example, 127.0.0.1:5173?url={file url}&type={file mime-type}&name={file
  name}&sphere=true
- The file URL format is changed to: {Left slice image address}, {Front slice image address}, {Right slice image
  address}, {Back slice image address}, {Top slice image address}, {Bottom slice image address}
- Picture addresses in six directions should be separated by separating them

### OBJ Model

- File url is the root address of the model, for example: http://xxxxx.com/{File MD5}
    - Structure address: http://xxxxx.com/{file md5}/{file name}.obj
    - Material address: http://xxxxx.com/{file md5}/{file name}.mtl
    - Texture address: http://xxxxx.com/{file md5}/{file name}.jpg
- The **name**、**type** parameter is required

## 📂 Supported File Types

| Category | MIME Types | Extensions | Preview Tech |
| --- | --- | --- | --- |
| **Image** | `image/*` (jpeg, png, gif, bmp, webp, svg, avif) | .jpg, .png, .gif, .bmp, .webp, .svg, .avif | [viewerjs](https://github.com/fengyuanchen/viewerjs) |
| **Video** | `video/*` (mp4, webm, ogg), `application/x-mpegURL` | .mp4, .webm, .ogv, .m3u8 | [video.js](https://github.com/videojs/video.js) |
| **Audio** | `audio/*` (mp3, wav, ogg, aac, flac) | .mp3, .wav, .ogg, .aac, .flac | HTML5 Audio |
| **PDF** | `application/pdf` | .pdf | [pdf.js](https://github.com/mozilla/pdf.js) / [OnlyOffice](https://www.onlyoffice.com/) |
| **Office** | `application/msword`, `application/vnd.openxmlformats-officedocument.*` | .doc, .docx, .xls, .xlsx, .ppt, .pptx | Microsoft Office Online / [OnlyOffice](https://www.onlyoffice.com/) |
| **3D Model** | `model/gltf+json`, `model/obj`, `model/x.stl-binary` | .gltf, .glb, .obj, .stl | [Three.js](https://github.com/mrdoob/three.js) / [Babylon.js](https://github.com/BabylonJS/Babylon.js) |
| **DXF** | `image/vnd.dxf` | .dxf | [dxf-viewer](https://github.com/g-h-c/dxf-viewer) |
| **JSON** | `application/json` | .json | [vue3-json-viewer](https://github.com/chen0820/vue3-json-viewer) |
| **Markdown** | `text/x-web-markdown` | .md | [md-editor-v3](https://github.com/imzane/md-editor-v3) |
| **Plain Text** | `text/*` | .txt, .js, .ts, .css, .html etc. | Built-in TextViewer |

## 🧩 Component API
