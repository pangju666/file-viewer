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

The simply encapsulated file preview service can be accessed as a service parameter after it is deployed
locally through nginx

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

## Supported File Types

| File Type                                                                 | extension | classification              |
|---------------------------------------------------------------------------|-----------|-----------------------------|
| application/vnd.openxmlformats-officedocument.wordprocessingml.document   | docx      | document                    |
| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         | xlsx      | document                    |
| application/vnd.openxmlformats-officedocument.presentationml.presentation | pptx      | document                    |
| application/msword                                                        | doc       | document                    |
| application/vnd.ms-excel                                                  | xls       | document                    |
| application/vnd.ms-powerpoint                                             | ppt       | document                    |
| audio/mpeg                                                                | mp3       | audio                       |
| audio/wav                                                                 | wav       | audio                       |
| audio/ogg                                                                 | ogg       | audio                       |
| audio/x-aac                                                               | aac       | audio                       |
| audio/x-flac                                                              | flac      | audio                       |
| video/mp4                                                                 | mp4       | video                       |
| video/ogg                                                                 | ogg       | video                       |
| video/webm                                                                | webm      | video                       |
| model/obj                                                                 | obj       | video                       |
| model/gltf-binary                                                         | glb       | video                       |
| model/x.stl-binary                                                        | stl       | video                       |
| text/x-web-markdown                                                       | md        | document                    |
| application/vnd.google-earth.kml+xml                                      | kml       | geographic files            |
| image/vnd.dxf                                                             | dxf       | engineering design drawings |
| application/json                                                          | json      | text                        |
| text/*                                                                    | txt       | image                       |
| image/jpeg                                                                | jpeg、jpg  | image                       |
| image/png                                                                 | png       | image                       |
| image/gif                                                                 | gif       | image                       |
| image/webp                                                                | webp      | image                       |
| image/svg+xml                                                             | svg       | image                       |
