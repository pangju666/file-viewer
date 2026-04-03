# @pangju666/file-viewer

基于 Vue 3 和 Naive UI 打造的高集成度文件预览服务，致力于集成各类常用格式文件的预览能力，提供统一且高度可定制的预览体验。


## 📂 支持的文件类型

| 类型             | 后缀                                                                                      | 
|----------------|-----------------------------------------------------------------------------------------|
| **图片**         | .jpg, .jpeg, .jpe, .jfif, .png, .gif, .bmp, .dib, .webp, .svg, .avif, ico               |                                                                                                                                                                                                          |
| **视频**         | .mp4, .m4v, .webm, .ogv, .m3u8, .mpd                                                    |                                                                                                                                                                                                                           |
| **音频**         | .mp3, .mp2, .mp1, .mpga, .m4a, .mp4, .aac, .ogg, .oga, .wav, .wave, .webm, .opus, .flac |                                                                                                                                                                
| **PDF文档**      | .pdf                                                                                    |                                                                                          
| **Office**     | .doc, .docx, .xls, .xlsx, .ppt, .pptx                                                   | 
| **3D 模型**      | .glb, .gltf, .obj, .stl                                                                 | 
| **DXF矢量图**     | .dxf                                                                                    | 
| **JSON**       | .json                                                                                   |                                                                                                                                                                                    
| **Markdown文档** | .md                                                                                     |                                                                                                                                                                                                
| **纯文本**        | .txt                                                                                    |

## 快速使用
### docker部署
```
docker run --name=file-viewer -d -p 80:80 snowy109/file-viewer:v1.0.0
```
### 📖 使用指南

项目部署后，可以通过携带参数来预览文件。

#### 预览 URL 示例

```text
http://your-domain/preview?src={file_url}&type={mime_type}&name={filename}
```

#### URL 参数说明

> **注意**：所有参数值均需要进行**URL 编码**，以避免特殊字符导致解析异常。

| 参数     | 说明                                 | 是否必填 |
|--------|------------------------------------|------|
| `src`  | 文件的`URL`地址（需支持跨域或同源）               | 是    |
| `type` | 文件的`MIME 类型`（若不传，组件会尝试通过请求文件头自动检测） | 否    |
| `name` | 文件名称                               | 否    |
| `id`   | 文件唯一标识符                            | 否    |


## 自定义
如果你不想使用公网的*onlyoffice、pdfjs*，可以把项目拉下来，自行打包
### 打包命令
```
docker build -t your_image:v1 --build-arg VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL=office_url .
```
更多参数请看下面，

### Office 预览配置
- `VITE_OFFICE_VIEWER_MODE`: `Office`文件的预览模式，可选值：
    - `microsoft`: 使用`Microsoft Office Online`预览（文件的`URL`需可公网访问）。
    - `onlyOffice`: 使用私有化的[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)服务预览。
- `VITE_OFFICE_VIEWER_LANGUAGE`: [`OnlyOffice`语言配置](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#lang)（默认：`zh`）。
- `VITE_OFFICE_VIEWER_REGION`: [`OnlyOffice`地区配置](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#region)（默认：`zh-CN`）。
- `VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL`: `Microsoft Office`在线预览地址（正常不需要改这个，例如：`https://view.officeapps.live.com/op/embed.aspx` ）。

### PDF 预览配置
- `VITE_PDF_VIEWER_MODE`: `PDF`文件的预览模式，可选值：
    - `pdfjs`: 使用内置的`pdf.js`预览。
    - `onlyOffice`: 使用私有化的[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)服务预览。
- `VITE_PDF_VIEWER_LANGUAGE`: [`OnlyOffice`语言配置](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#lang)（默认：`zh`）。
- `VITE_PDF_VIEWER_REGION`: [`OnlyOffice`地区配置](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#region)（默认：`zh-CN`）。
- `VITE_PDF_VIEWER_PDFJS_VIEW_BASE_URL`: PDF.js 服务地址（正常不需要改这个，例如：`https://mozilla.github.io/pdf.js/web/viewer.html` ）。

## 📄 许可证

[Apache-2.0](LICENSE)
