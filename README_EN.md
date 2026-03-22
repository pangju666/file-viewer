# @pangju/file-viewer

based on `Vue 3` and [`Naive UI`](https://www.naiveui.com/zh-CN/os-theme/docs/introduction)
The highly integrated file preview component created is committed to integrating the preview capabilities of various
commonly used formats to provide a unified and highly customizable interactive experience.

## 📂Supported file types

| Type                  | Suffix                                                                                  | 
|-----------------------|-----------------------------------------------------------------------------------------|
| **Image**             | .jpg, .jpeg, .jpe, .jfif, .png, .gif, .bmp, .dib, .webp, .svg, .avif, ico               | |
| **Video**             | .mp4, .m4v, .webm, .ogv, .m3u8, .mpd                                                    | |
| **Audio**             | .mp3, .mp2, .mp1, .mpga, .m4a, .mp4, .aac, .ogg, .oga, .wav, .wave, .webm, .opus, .flac |                                                                                                                                                                
| **PDF Document**      | .pdf                                                                                    |                                                                                          
| **Office**            | .doc, .docx, .xls, .xlsx, .ppt, .pptx                                                   | 
| **3D Model**          | .glb, .gltf, .obj, .stl                                                                 | 
| **DXF vector**        | .dxf                                                                                    | 
| **JSON**              | .json                                                                                   |                                                                                                                                                                                    
| **Markdown Document** | .md                                                                                     |                                                                                                                                                                                                
| **Plain text**        | .txt, .js, .ts, .css, .html, etc.                                                       |

## Online example

## 📦 Installation

```bash
pnpm add @pangju/file-viewer

yarn add @pangju/file-viewer

npm install @pangju/file-viewer
```

## 🚀 Quick start

### Global registration

in your `main.ts` or `main.js` Register the plug-in:

```javascript
import {createApp} from 'vue'
import App from './App.vue'
import FileViewer from '@pangju/file-viewer'
import '@pangju/file-viewer/index.css'

const app = createApp(App)
app.use(FileViewer)
app.mount('#app')
```

### Local introduction

You can also import it directly in the component:

```vue

<script setup>
  import {FileViewer} from '@pangju/file-viewer'
  import '@pangju/file-viewer/index.css'
  import {ref} from "vue";

  const fileItems = ref([
    {
      source: "https://disk.sample.cat/samples/pdf/sample-a4.pdf",
      mimeType: "application/pdf",
      name: "Sample A4 PDF",
      type: "PDF document",
      cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      tags: ["Test File", "Sample PDF"],
      size: 10000000,
      descriptions: [
        {
          name: "Create Time",
          value: "2026-3-18",
        },
        {
          name: "Create Author",
          value: "Fat Orange",
        },
      ],
    },
    {
      source: "https://disk.sample.cat/samples/png/monalisa-1200x1200.png",
      mimeType: "application/pdf",
      name: "Monalisa 1200x1200",
      type: {
        label: "image",
        value: "image",
      },
      cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      tags: [
        {
          value: "test file",
          type: "info",
        },
        {
          value: "test file",
          type: "success",
        }
      ],
      size: 10000000,
      descriptions: [
        {
          name: "Create Time",
          value: "2026-3-18",
        },
        {
          name: "Create Author",
          value: "Fat Orange",
        },
      ],
    },
  ]);
</script>

<template>
  <file-viewer :data="fileItems"/>
</template>
```

## data structure

### FileType

Structural definition of file type information.

```typescript
export type FileType = { label: string; value: string; } | string;
```

> 💡 **Tip**:
>
> `label`Display text used to define the file type. If not defined, use it directly.`value`as display text.

<details>
<summary>Expand to see examples</summary>

#### Example

```javascript
const fileTypes = [
    {
        label: "picture", //picture as display text
        value: "image", // image as value
    },
    {
        value: "picture", //picture as display text and value
    },
    "Picture" // Picture as display text and value
]
```

</details>

### FileItem

Structural definition of file information.

```typescript
export type FileItem = {
    source: string | File | Blob; // Source: URL, File object or Blob
    mimeType?: string; // MIME type (if undefined or null, try to use the type attribute of the Blob or File type to get it)
    id?: string; // Unique identifier, if it is a pdf or office file and you need to use onlyoffice preview, it is recommended to set the id
    name?: string; // File name (try to use the name attribute of the File type to get it if it is not defined)
    type?: string | { label: string; value: string }; // type
    cover?: string; // Cover image URL
    size?: number; // Size (unit: bytes) (if undefined or null, try to use the size property of the Blob or File type to get it)
    tags?: string[] | { value: string; type?: "default" | "primary" | "info" | "success" | "warning" | "error" }[]; // Tag collection
    descriptions?: { name: string; value: string }[]; // Description information
};
```

> 💡 **Tip**:
>
> built-in`Pdf`and`Office`The preview component only supports public networks`URL`, so it cannot be used`File`or`Blob`
> Type as file source (`FileItem.source`）。

<details>
<summary>Expand to see examples</summary>

#### Example

```javascript
const fileItems = [
    {
        source: "https://disk.sample.cat/samples/pdf/sample-a4.pdf",
        mimeType: "application/pdf",
        name: "Sample A4 PDF",
        type: "PDF document",
        cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        tags: ["Test File", "Sample PDF"],
        size: 10000000,
        descriptions: [
            {
                name: "Create Time",
                value: "2026-3-18",
            },
            {
                name: "Create Author",
                value: "Fat Orange",
            },
        ],
    },
    {
        source: "https://disk.sample.cat/samples/png/monalisa-1200x1200.png",
        mimeType: "application/pdf",
        name: "Monalisa 1200x1200",
        type: {
            label: "image",
            value: "image",
        },
        cover: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        tags: [
            {
                value: "test file",
                type: "info",
            },
            {
                value: "test file",
                type: "success",
            }
        ],
        size: 10000000,
        descriptions: [
            {
                name: "Create Time",
                value: "2026-3-18",
            },
            {
                name: "Create Author",
                value: "Fat Orange",
            },
        ],
    },
]
```

</details>

## 🧩 Components

### FileViewer

Multi-file preview component, use[`Naive UI Spin`](https://www.naiveui.com/zh-CN/os-theme/components/spin)
Integrated[Single file preview](#filepreview)(left) and[file list](#filelist)(right side).

> 💡 **Tip**:
>
> Automatic detection based on file content `MIME` Type trigger conditions:
> 1. `autoDetectType`The properties are`true`
> 2. [`FileItem`](#fileitem)of`mimeType`property`undefined`or for`null`
> 3. when`source`for`Blob`or`File`type`type`property`undefined`or for`null`

## Preview

![Preview](docs-images/file-viewer.webp)

#### property

Except inherited from[`FileList`](#filelist)and[`FilePreview`](#filepreview)In addition to the attributes, it also
contains the following attributes:

| name               | type                                            | default value                                                                            | description                                                                                                                                                       |
|--------------------|-------------------------------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `minSplitSize`     | `number \| string`                              | `0.1`                                                                                    | Preview panel minimum width ratio (derived from[`Naive UI Split`](https://www.naiveui.com/zh-CN/os-theme/components/split#Split-Props)of`min`properties)          |
| `maxSplitSize`     | `number \| string`                              | `0.9`                                                                                    | Preview panel maximum width ratio (derived from[`Naive UI Split`](https://www.naiveui.com/zh-CN/os-theme/components/split#Split-Props)of`max`properties)          |
| `defaultSplitSize` | `number \| string`                              | `0.8`                                                                                    | Preview panel default width ratio (derived from[`Naive UI Split`](https://www.naiveui.com/zh-CN/os-theme/components/split#Split-Props)of`default-size`properties) |
| `autoDetectType`   | `boolean`                                       | `true`                                                                                   | Whether to automatically detect based on file content `MIME Type`                                                                                                 |
| `detectFileType`   | `(file: FileItem) => string \| Promise<string>` | use[`file-type`](https://www.npmjs.com/package/file-type?activeTab=readme)Implementation | Custom file type detection function (when`autoDetectType`for`true`effective when), type reference[FileItem](#fileitem)                                            |
| `showLoading`      | `boolean`                                       | `true`                                                                                   | Whether to display loading prompt                                                                                                                                 |
| `loadingText`      | `string`                                        | `"正在加载中..."`                                                                             | Loading prompt text (from[`Naive UI Spin`](https://www.naiveui.com/zh-CN/os-theme/components/spin#Spin-Props)of`description`properties)                           |
| `loadingSize`      | `"small" \| "medium" \| "large" \| number`      | `"large"`                                                                                | Loading icon size (from[`Naive UI Spin`](https://www.naiveui.com/zh-CN/os-theme/components/spin#Spin-Props)of`size`properties)                                    |

#### event

| Name            | Parameters         | Description                                                                                                                       |
|-----------------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `loading-start` | `()`               | Triggered when starting to load a file (`showLoading`for`false`It will be triggered only when )                                   |
| `loading-end`   | `()`               | Fires when file loading is complete (`showLoading`for`false`It will be triggered only when )                                      |
| `loading-error` | `()`               | Triggered when file loading fails (`showLoading`for`false`It will be triggered only when )                                        |
| `click-file`    | `(file: FileItem)` | Triggered when a file in the list is clicked (`showLoading`for`false`will be triggered only), type reference[FileItem](#fileitem) |

#### method

| Name         | Parameters         | Description                                                                                                              |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------|
| `changeFile` | `(file: FileItem)` | Modify the current preview file (mainly used in combination with custom file lists), type reference[FileItem](#fileitem) |

#### slot

| Name      | Parameters                | Description                                                                                                          |
|-----------|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| `list`    | `()`                      | Display of file list on the right                                                                                    |
| `preview` | `(currentFile: FileItem)` | Display of the preview area on the left (`showLoading`for`false`effective when), type reference[FileItem](#fileitem) |

### FileList

File list component, displayed in card form by default[`文件信息`](#fileitem)

> 💡 **Tip**:
>
> If you want to pass in all file data at once, please use`data`Attribute, please use if you need to load in pages.
`onLoad`property.
>
> `onLoad`Attribute priority is greater than`data`property.

#### Preview

![Preview](docs-images/file-list.webp)

#### property

| Properties             | Type                                                                                     | Default Value                                                        | Description                                                                                                                                                                                                     |
|------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`                | `string`                                                                                 | `"文件列表"`                                                             | Title                                                                                                                                                                                                           |
| `data`                 | `FileItem[] \| Promise<FileItem[]> \| (() => FileItem[]) \| (() => Promise<FileItem[]>)` | `undefined`                                                          | File data (if passed in`onLoad`, the attribute is invalid), type reference[FileItem](#fileitem)                                                                                                                 |
| `showBackTop`          | `boolean`                                                                                | `true`                                                               | Whether to display the back to top button                                                                                                                                                                       |
| `showSearch`           | `boolean`                                                                                | `true`                                                               | Whether to display the search box                                                                                                                                                                               |
| `showTitle`            | `boolean`                                                                                | `true`                                                               | Whether to display the title                                                                                                                                                                                    |
| `showFilter`           | `boolean`                                                                                | `true`                                                               | Whether to display filters                                                                                                                                                                                      |
| `showDescriptions`     | `boolean`                                                                                | `true`                                                               | Whether to display file description information                                                                                                                                                                 |
| `showCover`            | `boolean`                                                                                | `true`                                                               | Whether to display the file cover                                                                                                                                                                               |
| `showTags`             | `boolean`                                                                                | `true`                                                               | Whether to display file label information                                                                                                                                                                       |
| `showType`             | `boolean`                                                                                | `true`                                                               | Whether to display file type information                                                                                                                                                                        |
| `coverHeight`          | `number \| string`                                                                       | `150`                                                                | Cover image height (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`height`properties)                                                                            |
| `coverObjectFit`       | `"fill" \| "contain" \| "cover" \| "none" \| "scale-down"`                               | `"fill"`                                                             | Cover image zoom mode (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`object-fit`properties)                                                                     |
| `coverLazy`            | `boolean`                                                                                | `false`                                                              | Whether to lazily load the cover image (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`lazy`properties)                                                          |
| `coverFallbackSrc`     | `string`                                                                                 | `undefined`                                                          | The address displayed when the cover image fails to load,`coverLazy`for`false`Valid when                                                                                                                        |
| `coverFallbackIcon`    | `Component`                                                                              | `Image(@vicons/ionicons5)`                                           | The icon component displayed when the cover image fails to load (from[`Naive UI Icon`](https://www.naiveui.com/zh-CN/os-theme/components/icon#Icon-Props)of`component`property),`coverLazy`for`false`Valid when |
| `coverPlaceholderSrc`  | `string`                                                                                 | `undefined`                                                          | The address displayed when the cover image is loaded,`coverLazy`for`true`Valid when                                                                                                                             |
| `coverPlaceholderIcon` | `Component`                                                                              | `Image(@vicons/ionicons5)`                                           | The icon component displayed in the cover image loading (derived from[`Naive UI Icon`](https://www.naiveui.com/zh-CN/os-theme/components/icon#Icon-Props)of`component`property),`coverLazy`for`true`Valid when  |
| `cardSize`             | `"small" \| "medium" \| "large" \| "huge"`                                               | `"small"`                                                            | File card size (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Props)of`size`properties)                                                                                     |
| `cardHoverable`        | `boolean`                                                                                | `true`                                                               | Whether the file card can be floated (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Props)of`hoverable`properties)                                                          |
| `cardBordered`         | `boolean`                                                                                | `true`                                                               | Whether the file card has a border (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Props)of`bordered`properties)                                                             |
| `types`                | `FileType[] \| Promise<FileType[]> \| (() => FileType[]) \| (() => Promise<FileType[]>)` | `undefined`                                                          | File type data (for default filter component data), type reference[FileType](#filetype)                                                                                                                         |
| `filter`               | `(file: FileItem, types: string[], keyword?: string) => boolean`                         | using file name and file type (`type`instead of`mimeType`) to filter | Custom file data search/filter method (if passed in`onLoad`, the attribute is invalid), type reference[FileItem](#fileitem)                                                                                     |
| `onLoad`               | `(page: number, types: string[], keyword?: string) => Promise<FileItem[]> \| FileItem[]` | `undefined`                                                          | Asynchronous loading of file data method (after passing in`filter`and`data`will be invalid, the sole right to`onLoad`to define how to obtain and filter results), type reference[FileItem](#fileitem)           |
| `noMore`               | `boolean`                                                                                | `undefined`                                                          | Whether all data has been loaded (if not passed in`onLoad`, then this attribute is invalid)                                                                                                                     |
| `customDownload`       | `(fileItem: FileItem) => void`                                                           | use`a`Tag download                                                   | Custom download method, type reference[FileItem](#fileitem)                                                                                                                                                     |

#### event

| Name         | Parameters         | Description                                                                       |
|--------------|--------------------|-----------------------------------------------------------------------------------|
| `click-file` | `(file: FileItem)` | Triggered when a file in the list is clicked, type reference[FileItem](#fileitem) |

#### method

| Name          | Parameters | Description                                                                         |
|---------------|------------|-------------------------------------------------------------------------------------|
| `refreshData` | `()`       | Refresh file data (mainly used in conjunction with custom search boxes and filters) |

#### slot

| Name                | Parameters               | Description                                                                                                                                                                                            |
|---------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`             | `()`                     | Display of file list titles (`showTitle`for`true`effective when)                                                                                                                                       |
| `search`            | `()`                     | Display of search box (`showSearch`for`true`takes effect when`refreshData`Method usage)                                                                                                                |
| `filter`            | `()`                     | Display of filters (`showFilter`for`true`takes effect when`refreshData`Method usage)                                                                                                                   |
| `loading`           | `()`                     | Display of file data loading                                                                                                                                                                           |
| `empty`             | `()`                     | Display of empty file list                                                                                                                                                                             |
| `no-more`           | `()`                     | No more data to display                                                                                                                                                                                |
| `back-top`          | `()`                     | Return to top button display                                                                                                                                                                           |
| `list`              | `(fileList: FileItem[])` | Display of file list, type reference[FileItem](#fileitem)                                                                                                                                              |
| `card-header`       | `(fileItem: FileItem)`   | File card header content (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`header`slot), type reference[FileItem](#fileitem)                                 |
| `card-header-extra` | `(fileItem: FileItem)`   | Extra content in file card header (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`header-extra`slot), type reference[FileItem](#fileitem)                  |
| `card-cover`        | `(fileItem: FileItem)`   | File card cover content (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`cover`slot), type reference[FileItem](#fileitem)                                   |
| `card-footer`       | `(fileItem: FileItem)`   | Content at the bottom of the file card label (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`footer`slot), type reference[FileItem](#fileitem)             |
| `card-action`       | `(fileItem: FileItem)`   | Content on the left side of the file card operation area (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`action`slot), type reference[FileItem](#fileitem) |
| `card-action-extra` | `(fileItem: FileItem)`   | Extra content on the left side of the file card operation area (similar to`action`Slots are mutually exclusive), type reference[FileItem](#fileitem)                                                   |
| `card-action-right` | `(fileItem: FileItem)`   | The content on the right side of the file card operation area (with`action`Slots are mutually exclusive), type reference[FileItem](#fileitem)                                                          |
| `card-default`      | `(fileItem: FileItem)`   | File card content (from[`Naive UI Card`](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots)of`default`slot), type reference[FileItem](#fileitem)                                       |

### FilePreview

Single file preview component, based on the file's`mimeType`Render different types of preview components.

| Component name                      | Correspondence`mimeType`                                                                                                                                                                                                                                                                                       | Component Description               |
|:------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------|
| [`AudioViewer`](#audioviewer)       | `image/`(`jpeg`, `png`, `gif`, `bmp`, `webp`, `svg+xml`, `avif`, `x-icon`)                                                                                                                                                                                                                                     | `音频`Preview component.              |
| [`VideoViewer`](#videoviewer)       | `video/`(`mp4`, `webm`), `application/x-mpegURL`, `application/vnd.apple.mpegurl`, `application/dash+xml`                                                                                                                                                                                                      | `视频`Preview component.              |
| [`ImageViewer`](#imageviewer)       | `audio/`(`mpeg`, `mp4`, `aac`, `ogg`, `wav`, `webm`, `opus`, `flac`)                                                                                                                                                                                                                                           | `图片`Preview component.              |
| [`DxfViewer`](#dxfviewer)           | `image/vnd.dxf`                                                                                                                                                                                                                                                                                                | `DXF`Vector preview component.      |
| [`JsonViewer`](#jsonviewer)         | `application/json`                                                                                                                                                                                                                                                                                             | `JSON`File preview component.       |
| [`MarkdownViewer`](#markdownviewer) | `text/x-web-markdown`                                                                                                                                                                                                                                                                                          | `Markdown`File preview component.   |
| [`TextViewer`](#textviewer)         | `text/*`                                                                                                                                                                                                                                                                                                       | `纯文本`File preview component.        |
| [`PdfViewer`](#pdfviewer)           | `application/pdf`                                                                                                                                                                                                                                                                                              | `PDF`File preview component.        |
| [`OfficeViewer`](#officeviewer)     | `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.ms-powerpoint`, `application/vnd.openxmlformats-officedocument.presentationml.presentation` | `Office`Document preview component. |
| [`ModelViewer`](#modelviewer)       | `model/`(`gltf-binary`, `gltf+json`, `obj`, `x.stl-binary`)                                                                                                                                                                                                                                                    | `3D模型`Preview component.            |

> 💡 **Tip**:
>
> built-in`Pdf`and`Office`The preview component only supports public networks`URL`, so it cannot be used`File`or`Blob`
> Type as file source (`FileItem.source`）。

#### property

| Properties            | Type                                                                                                                                                                                                                                                                                                                                          | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`                | `FileItem`                                                                                                                                                                                                                                                                                                                                    | `undefined`   | Need to preview[File information](#fileitem)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `enableImage`         | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`图片`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `enableVideo`         | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`视频`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `enableAudio`         | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`音频`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `enablePdf`           | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`PDF`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `enableOffice`        | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`Office`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `enableModel`         | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`3D 模型`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `enableMarkdown`      | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`Markdown 文档`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `enableText`          | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`纯文本`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `enableJson`          | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`JSON`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `enableDxf`           | `boolean`                                                                                                                                                                                                                                                                                                                                     | `true`        | Whether to enable`DXF 矢量图`File Preview                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `customViewerMatcher` | `string[] \| ((file: FileItem) => boolean)`                                                                                                                                                                                                                                                                                                   | `undefined`   | Customized file preview matching logic (used to determine whether to use custom preview components), type reference[FileItem](#fileitem)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `viewerOptions`       | `{ audio?: Record<string, unknown>; dxf?: Record<string, unknown>; image?: Record<string, unknown>; json?: Record<string, unknown>; markdown?: Record<string, unknown>; model?: Record<string, unknown>; office?: Record<string, unknown>; pdf?: Record<string, unknown>; video?: Record<string, unknown>; text?: Record<string, unknown>; }` | `undefined`   | Exclusive configuration objects for each type of file preview component:<br>• `audio`: [`音频`Preview component](#audioviewer)<br>• `video`: [`视频`Preview component](#videoviewer)<br>• `image`: [`图片`Preview component](#imageviewer)<br>• `pdf`: [`PDF`Preview component](#pdfviewer)<br>• `office`: [`Office`Preview component](#officeviewer)<br>• `model`: [`3D模型`Preview component](#modelviewer)<br>• `dxf`: [`DXF`Preview component](#dxfviewer)<br>• `json`: [`JSON`Preview component](#jsonviewer)<br>• `markdown`: [`Markdown`Preview component](#markdownviewer)<br>• `text`: [`纯文本`Preview component](#textviewer) |

#### event

| Name            | Parameters | Description                          |
|-----------------|------------|--------------------------------------|
| `loading-start` | `()`       | Triggered when loading a file starts |
| `loading-end`   | `()`       | Fired when file loading is complete  |
| `loading-error` | `()`       | Triggered when file loading fails    |

#### method

| Name       | Parameters                           | Description                                                                                                    |
|------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `setError` | `(reason?: string, error?: unknown)` | Report file preview failed (`reason`for error reasons,`error`Errors thrown for each type of preview component) |

#### slot

| Name       | Parameters                                                                                                       | Description                                                            |
|------------|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `error`    | `(reason?: string, filename?: string, fileUrl: string, mimeType: string, fileEncoding: string, error?: unknown)` | Display when the preview component renders incorrectly                 |
| `custom`   | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | Display of user-defined file preview component                         |
| `audio`    | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `音频`Display during file preview                                        |
| `image`    | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `图片`Display during file preview                                        |
| `video`    | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `视频`Display during file preview                                        |
| `model`    | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `3D 模型`Display during file preview                                     |
| `office`   | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `Office`Display during file preview                                    |
| `markdown` | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `Markdown 文档`Display during file preview                               |
| `dxf`      | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `DXF 矢量图`Display during file preview                                   |
| `pdf`      | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `PDF`Display during file preview                                       |
| `json`     | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `JSON`Display during file preview                                      |
| `text`     | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | `纯文本`Display during file preview                                       |
| `unknown`  | `(filename?: string, fileUrl: string, mimeType: string, fileEncoding: string)`                                   | Display when previewing files without corresponding preview components |

### AudioViewer

`音频`To preview the component, use`audio`Tag implementation

#### Preview

![Preview](docs-images/audio-viewer.webp)

#### property

| Properties          | Type                                                       | Default Value                    | Description                                                                                                                                                                       |
|---------------------|------------------------------------------------------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`               | `string`                                                   | `undefined`                      | of audio files`URL`                                                                                                                                                               |
| `title`             | `string`                                                   | `undefined`                      | Title of audio                                                                                                                                                                    |
| `cover`             | `string`                                                   | `cover`                          | Audio cover picture`URL`                                                                                                                                                          |
| `autoplay`          | `boolean`                                                  | `false`                          | Whether to enable autoplay (from`audio`tag)                                                                                                                                       |
| `controls`          | `boolean`                                                  | `true`                           | Whether to enable the control panel (from`audio`tag)                                                                                                                              |
| `coverHeight`       | `number`                                                   | `180`                            | Cover image height (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`width`properties)                                               |
| `coverObjectFit`    | `"fill" \| "contain" \| "cover" \| "none" \| "scale-down"` | `"cover"`                        | Cover image zoom mode (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`object-fit`properties)                                       |
| `coverFallbackSrc`  | `string`                                                   | `undefined`                      | The address displayed when the cover image fails to load (from[`Naive UI Image`](https://www.naiveui.com/zh-CN/os-theme/components/image#Image-Props)of`fallback-src`properties)  |
| `coverFallbackIcon` | `Component`                                                | `MusicalNote(@vicons/ionicons5)` | The icon component displayed when the cover image fails to load (from[`Naive UI Icon`](https://www.naiveui.com/zh-CN/os-theme/components/icon#Icon-Props)of`component`properties) |

#### event

| Name    | Parameters            | Description                                                            |
|---------|-----------------------|------------------------------------------------------------------------|
| `ready` | `()`                  | Triggered when audio can be played                                     |
| `error` | `(error: MediaError)` | Triggered when audio playback fails (`error`Depend on`audio`tag throw) |

### VideoViewer

`视频`To preview the component, use[`video.js`](https://www.npmjs.com/package/video.js)accomplish

#### Preview

![Preview](docs-images/video-viewer.webp)

#### property

| Properties      | Type                                          | Default Value                                            | Description                                                                    |
|-----------------|-----------------------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------|
| `src`           | `{ url: string; mimeType: string } \| string` | `undefined`                                              | of video files`URL`                                                            |
| `poster`        | `string`                                      | `undefined`                                              | Video cover image`URL`                                                         |
| `playerOptions` | `Record<string, unknown>`                     | `{ language: "zh-CN", autoplay: false, controls: true }` | `videojs`methodological[`options`](https://legacy.videojs.org/guides/options/) |

#### event

| Name    | Parameters            | Description                                                          |
|---------|-----------------------|----------------------------------------------------------------------|
| `ready` | `()`                  | Triggered when the video can be played                               |
| `error` | `(error: MediaError)` | Triggered when video playback fails (`error`Depend on`videojs`throw) |

### ImageViewer

`图片`To preview the component, use[`Viewer.js`](https://www.npmjs.com/package/viewerjs)accomplish

> 💡 **Tip**:
>
> `Viewer.js`of`{ inline: true, navbar: false, button: false }`For fixed configuration.
>
> `Viewer.js`of`title`The attribute defaults to (`${props.title} ${imageData.naturalWidth}x${imageData.naturalHeight}`）

#### Preview

![Preview](docs-images/image-viewer.webp)

#### property

| Properties      | Type                      | Default Value                                                                                                                                                                                    | Description                                                                      |
|-----------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| `src`           | `string`                  | `undefined`                                                                                                                                                                                      | of image files`URL`                                                              |
| `title`         | `string`                  | `undefined`                                                                                                                                                                                      | Image title                                                                      |
| `viewerOptions` | `Record<string, unknown>` | `{ toolbar: { flipHorizontal: true, flipVertical: true, next: false, oneToOne: true, play: false, prev: false, reset: true, rotateLeft: true, rotateRight: true, zoomIn: true, zoomOut: true }}` | `Viewer`Constructor's[`options`](https://www.npmjs.com/package/viewerjs#options) |

#### event

| Name    | Parameters | Description                                                               |
|---------|------------|---------------------------------------------------------------------------|
| `ready` | `()`       | Triggered when the image is loaded (by`Viewer.js`of`viewed`event emitted) |
| `error` | `()`       | Triggered when the browser fails to load the image                        |

### DxfViewer

`DXF`To preview the component, use[`dxf-viewer`](https://www.npmjs.com/package/dxf-viewer)accomplish

> 💡 **Tip**:
>
> It is recommended not to modify`viewerOptions`Properties, I couldn't find official documentation, and the default
> configuration was written by referring to the sample code.
>
> Requires configuration`fonts`The properties pass in some fonts (the official example has several
> fonts:[portal](https://github.com/vagran/dxf-viewer-example-src/tree/master/src/assets/fonts)), otherwise the text
> cannot be displayed normally.

#### property

| Properties         | Type                      | Default Value                                                                                                                                   | Description                                                                                                                                      |
|--------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`              | `string`                  | `undefined`                                                                                                                                     | `DXF`Documentary`URL`                                                                                                                            |
| `showProgressBar`  | `boolean`                 | `true`                                                                                                                                          | Whether to display the loading progress bar                                                                                                      |
| `showLayerList`    | `boolean`                 | `true`                                                                                                                                          | Whether to display the layer list                                                                                                                |
| `layerListWidth`   | `number \| string`        | `300`                                                                                                                                           | Layer list width (from[`Naive UI Layout-Sider`](https://www.naiveui.com/zh-CN/os-theme/components/layout#Layout-Sider-Props)of`width`properties) |
| `fonts`            | `string[]`                | `[]`                                                                                                                                            | Fonts used for rendering                                                                                                                         |
| `dxfViewerOptions` | `Record<string, unknown>` | `{ fileEncoding: "utf-8", clearColor: new Three.Color("#fff"), autoResize: true, colorCorrection: true, sceneOptions: { wireframeMesh: true }}` | `DxfViewer`Constructor's`options`, please refer to[`DXF Viewer 源码 第691行`](https://github.com/vagran/dxf-viewer/blob/master/src/DxfViewer.js)     |

#### event

| Name       | Parameters                                                                                     | Description                                                                                                                                                                                                                                                                                                                             |
|------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ready`    | `()`                                                                                           | `DXF`Triggered when loading is complete                                                                                                                                                                                                                                                                                                 |
| `error`    | `(error: Error)`                                                                               | `DXF`Triggered when loading fails (`error`Depend on`dxf-viewer`of`Load`method throws)                                                                                                                                                                                                                                                   |
| `progress` | `(phase: "font" \| "fetch" \| "parse" \| "prepare", processedSize: number, totalSize: number)` | `DXF`Thrown when loading.<br>**Parameter Description**:<br>• `phase`: Current loading stage<br>- `font`: Load font resources<br>- `fetch`: Download file data<br>- `parse`: Parse file content<br>- `prepare`: Prepare rendering data<br>• `processedSize`: loaded/processed size (bytes)<br>• `totalSize`: Total resource size (bytes) |

#### Example

![Preview](docs-images/dxf-viewer.webp)

```vue

<template>
  <dxf-viewer
      src="https://raw.githubusercontent.com/gdsestimating/dxf-parser/refs/heads/master/samples/data/api-cw750-details.dxf"
      class="pangju-wh-100" :fonts="fonts"/>
</template>

<script setup>
  import {DxfViewer} from "@pangju/file-viewer";
  import {ref} from "vue";

  import HanaMinAFont from "@/assets/fonts/HanaMinA.ttf";
  import NanumGothicRegularFont from "@/assets/fonts/HanaMinA.ttf";
  import NotoSansDisplaySemiCondensedLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
  import RobotoLightItalicFont from "@/assets/fonts/HanaMinA.ttf";

  const fonts = ref([
    HanaMinAFont, NanumGothicRegularFont, NotoSansDisplaySemiCondensedLightItalicFont, RobotoLightItalicFont
  ]);
</script>
```

### JsonViewer

`JSON`To preview the component, use[`vue3-json-viewer`](https://www.npmjs.com/package/vue3-json-viewer)accomplish

#### Preview

![Preview](docs-images/json-viewer.webp)

#### property

| Properties        | Type                                                                                                 | Default Value                                         | Description                                                                           |
|-------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------|
| `src`             | `string \| { url: string; fileEncoding?: string }`                                                   | `undefined`                                           | `JSON`Documentary`URL`                                                                |
| `contentLoader`   | `(url: string, fileEncoding: string) => Record<string, unknown> \| Promise<Record<string, unknown>>` | use`fetch`Download                                    | Customize from`URL`How to load file content                                           |
| `jsonViewerProps` | `Record<string, unknown>`                                                                            | `{ copyable: true, expanded: true, expandDepth: 10 }` | [`JsonViewer 属性`](https://vjv-doc-qiuquanwu.vercel.app/#typescript%E6%94%AF%E6%8C%81) |

#### event

| Name    | Parameters       | Description                                                              |
|---------|------------------|--------------------------------------------------------------------------|
| `ready` | `()`             | Triggered when the file content is loaded                                |
| `error` | `(error: Error)` | Triggered when file content fails to load (`error`Depend on`fetch`throw) |

### MarkdownViewer

`Markdown`To preview the component, use[`md-editor-v3`](https://www.npmjs.com/package/md-editor-v3)accomplish

#### Preview

![Preview](docs-images/markdown-viewer.webp)

#### property

| Properties       | Type                                                               | Default Value      | Description                                                                                        |
|------------------|--------------------------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------|
| `src`            | `string \| { url: string; fileEncoding?: string }`                 | `undefined`        | `Markdown`Documentary`URL`                                                                         |
| `showCatalog`    | `boolean`                                                          | `true`             | Whether to display the directory                                                                   |
| `catalogWidth`   | `number`                                                           | `350`              | Directory width                                                                                    |
| `contentLoader`  | `(url: string, fileEncoding: string) => string \| Promise<string>` | use`fetch`Download | Customize from`URL`How to load file content                                                        |
| `mdPreviewProps` | `Record<string, unknown>`                                          | `undefined`        | [`MdPreview 属性`](https://imzbf.github.io/md-editor-v3/zh-CN/api/#%F0%9F%94%96%20MdPreview%20Props) |

#### event

| Name    | Parameters       | Description                                                              |
|---------|------------------|--------------------------------------------------------------------------|
| `ready` | `()`             | Triggered when the file content is loaded                                |
| `error` | `(error: Error)` | Triggered when file content fails to load (`error`Depend on`fetch`throw) |

### TextViewer

`纯文本`To preview the component, use`pre`Element implementation

#### Example diagram

![Preview](docs-images/text-viewer.webp)

#### property

| Properties      | Type                                                               | Default Value      | Description                                 |
|-----------------|--------------------------------------------------------------------|--------------------|---------------------------------------------|
| `src`           | `string \| { url: string; fileEncoding?: string }`                 | `undefined`        | `纯文本`Documentary`URL`                       |
| `contentLoader` | `(url: string, fileEncoding: string) => string \| Promise<string>` | use`fetch`Download | Customize from`URL`How to load file content |

#### event

| Name    | Parameters       | Description                                                              |
|---------|------------------|--------------------------------------------------------------------------|
| `ready` | `()`             | Triggered when the file content is loaded                                |
| `error` | `(error: Error)` | Triggered when file content fails to load (`error`Depend on`fetch`throw) |

### PDFViewer

PDF preview component,
use[PDF.js Viewer](https://learn.microsoft.com/zh-cn/office365/servicedescriptions/office-online-service-description/office-online-service-description)
or[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)accomplish

> 💡 **Tip**:
>
> use`pdfjs`The best mode is in the project`public`directory, put a copy of the code you built, or use`nginx`Configure a
> copy of your own build.
>
> use[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)The mode
> requires you to deploy the server environment yourself.
>
> `mode`for`onlyOffice`hour,`key`Must be unique (if not defined`key`, the default is to
> use (https://www.npmjs.com/package/nanoid) to generate a unique identifier).

#### property

| Properties            | Type                                      | Default Value                                        | Description                                                                                                                                             |
|-----------------------|-------------------------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`                 | `string \| { url: string; key?: string }` | `undefined`                                          | `Pdf`Documentary`URL`（`mode`for`onlyOffice`need to be passed in when`{ url: string; key: string }`Type)                                                 |
| `title`               | `string`                                  | `undefined`                                          | `Pdf`The title of the file (only if`mode`for`onlyOffice`effective when)                                                                                 |
| `id`                  | `string`                                  | `"only-office-editor"`                               | `DocumentEditor`of`id`                                                                                                                                  |
| `token`               | `string`                                  | `undefined`                                          | [`OnlyOffice`Token configuration](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/#token)                                               |
| `mode`                | `"pdfjs" \| "onlyOffice"`                 | `"pdfjs"`                                            | `pdfjs`use`iframe`call`PDF.js Viewer`accomplish,`onlyOffice`use`OnlyOffice`Implementation                                                               |
| `region`              | `string`                                  | `"zh-CN"`                                            | [`OnlyOffice`Region configuration](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#region)                                      |
| `pdfjsViewBaseUrl`    | `string`                                  | `"https://mozilla.github.io/pdf.js/web/viewer.html"` | `PDF.js Viewer`Address (it is best to change it to the address deployed by yourself, or`public`path under the directory)                                |
| `onlyOfficeServerUrl` | `string`                                  | `undefined`                                          | [`OnlyOffice`Server address](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/),For example:`http://localhost:10000` |

#### event

| Name    | Parameters                                       | Description                                                                                                                                                                     |
|---------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ready` | `()`                                             | Triggered when the preview page rendering is completed                                                                                                                          |
| `error` | `(errorDescription: string, errorCode?: number)` | `Pdf`Triggered when file loading fails (`errorDescription`is an error message,`errorCode`yes[error code](https://github.com/ONLYOFFICE/sdkjs/blob/master/common/errorCodes.js)） |

#### Example

use[PDF.js Viewer](https://learn.microsoft.com/zh-cn/office365/servicedescriptions/office-online-service-description/office-online-service-description)

![Preview](docs-images/pdf-viewer-pdfjs.webp)

```vue

<template>
  <pdf-viewer src="https://disk.sample.cat/samples/pdf/sample-a4.pdf" mode="pdfjs" class="pangju-wh-100"/>
</template>

<script setup>
  import {PdfViewer} from "@pangju/file-viewer";
</script>
```

use[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)

![Preview](docs-images/pdf-viewer-onlyoffice.webp)

```vue

<template>
  <pdf-viewer :src="pdfUrl" title="Sample A4 PDF" mode="onlyOffice" only-office-server-url="http://localhost:10000"
              class="pangju-wh-100"/>
</template>

<script setup>
  import {PdfViewer} from "@pangju/file-viewer";
  import {ref} from "vue";

  const pdfUrl = ref({
    url: "https://disk.sample.cat/samples/pdf/sample-a4.pdf",
    mimeType: "application/pdf",
    key: "1234"
  })
</script>
```

### OfficeViewer

`Office`Document preview component, use[
`Microsoft Office Online`](https://learn.microsoft.com/zh-cn/office365/servicedescriptions/office-online-service-description/office-online-service-description)
or[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)accomplish

> 💡 **Tip**:
>
> use[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)The mode
> requires you to deploy the server environment yourself.
>
> `mode`for`onlyOffice`hour,`key`Must be unique (if not defined`key`, the default is to
> use (https://www.npmjs.com/package/nanoid) to generate a unique identifier).

#### property

| Properties             | Type                                                        | Default Value                                      | Description                                                                                                                                             |
|------------------------|-------------------------------------------------------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`                  | `string \| { url: string; mimeType: string; key?: string }` | `undefined`                                        | `Office`Documentary`URL`（`mode`for`onlyOffice`need to be passed in when`{ url: string; mimeType: string; key: string }`Type)                            |
| `title`                | `string`                                                    | `undefined`                                        | `Office`The title of the file (only if`mode`for`onlyOffice`effective when)                                                                              |
| `id`                   | `string`                                                    | `"only-office-editor"`                             | `DocumentEditor`of`id`                                                                                                                                  |
| `token`                | `string`                                                    | `undefined`                                        | [`OnlyOffice`Token configuration](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/#token)                                               |
| `mode`                 | `"microsoft" \| "onlyOffice"`                               | `"microsoft"`                                      | `microsoft`use`iframe`call`Microsoft Office Online`accomplish,`onlyOffice`use`OnlyOffice`Implementation                                                 |
| `region`               | `string`                                                    | `"zh-CN"`                                          | [`OnlyOffice`Region configuration](https://api.onlyoffice.com/zh-CN/docs/docs-api/usage-api/config/editor/#region)                                      |
| `microsoftViewBaseUrl` | `string`                                                    | `"https://view.officeapps.live.com/op/embed.aspx"` | `Microsoft Office Online`Address (generally no need to change)                                                                                          |
| `onlyOfficeServerUrl`  | `string`                                                    | `undefined`                                        | [`OnlyOffice`Server address](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/),For example:`http://localhost:10000` |

#### event

| Name    | Parameters                                       | Description                                                                                                                                                                        |
|---------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ready` | `()`                                             | Triggered when the preview page rendering is completed                                                                                                                             |
| `error` | `(errorDescription: string, errorCode?: number)` | `Office`Triggered when file loading fails (`errorDescription`is an error message,`errorCode`yes[error code](https://github.com/ONLYOFFICE/sdkjs/blob/master/common/errorCodes.js)） |

#### Example

use[
`Microsoft Office Online`](https://learn.microsoft.com/zh-cn/office365/servicedescriptions/office-online-service-description/office-online-service-description)

![Preview](docs-images/office-viewer-microsoft.webp)

```vue

<template>
  <office-viewer src="https://disk.sample.cat/samples/docx/sample5.doc" mode="microsoft" class="pangju-wh-100"/>
</template>

<script setup>
  import {OfficeViewer} from "@pangju/file-viewer";
</script>
```

use[`OnlyOffice`](https://api.onlyoffice.com/zh-CN/docs/docs-api/get-started/installation/self-hosted/)

![Preview](docs-images/office-viewer-onlyoffice.webp)

```vue

<template>
  <office-viewer :src="officeUrl" title="Sample DOC" mode="onlyOffice" only-office-server-url="http://localhost:10000"
                 class="pangju-wh-100"/>
</template>

<script setup>
  import {OfficeViewer} from "@pangju/file-viewer";
  import {ref} from "vue";

  const officeUrl = ref({
    url: "https://disk.sample.cat/samples/docx/sample5.doc",
    mimeType: "application/msword",
    key: "123"
  })
</script>
```

### ModelViewer

`3D模型`To preview the component, use[`@babylonjs/viewer`](https://www.npmjs.com/package/@babylonjs/viewer)accomplish

#### property

| Properties                | Type                                          | Default Value | Description                                                                                                               |
|---------------------------|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------|
| `src`                     | `{ url: string; mimeType: string } \| string` | `undefined`   | `3D模型`Documentary`URL`                                                                                                    |
| `showProgressBar`         | `boolean`                                     | `true`        | Whether to display the loading progress bar (the progress bar is`babylon-viewer`Element built-in UI)                      |
| `babylonViewerAttributes` | `Record<string, unknown>`                     | `undefined`   | [`babylon-viewer`element attributes](https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer/elementInterface/) |

#### event

| Name       | Parameters                               | Description                                                                                                                   |
|------------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `ready`    | `()`                                     | Triggered when model loading is completed                                                                                     |
| `progress` | `(loadingProgress: number)`              | Triggered when the model is loaded (`loadingProgress`The percentage of progress the model has been loaded, for example:`0.9`） |
| `error`    | `(error?: Error, errorMessage?: string)` | Triggered when model loading fails (`error`and`errorMessage`from`babylon-viewer`element)                                      |

#### Example

![Preview](docs-images/model-viewer.webp)

```vue

<template>
  <model-viewer :src="modelSrc" class="pangju-wh-100"/>
</template>

<script setup>
  import {ModelViewer} from "@pangju/file-viewer";
  import {ref} from "vue";

  const modelSrc = ref({
    url: 'https://threejs.org/examples/models/obj/male02/male02.obj',
    mimeType: 'model/obj'
  });
</script>
```

### UnknownViewer

`未知`Preview component, a cover-up component when there is no preview component corresponding to the file type.

#### property

| Properties | Type     | Default Value | Description     |
|------------|----------|---------------|-----------------|
| `title`    | `string` | `"不支持预览该文件"`  | Title           |
| `src`      | `string` | `undefined`   | file`URL`       |
| `filename` | `string` | `undefined`   | File name       |
| `mimeType` | `string` | `undefined`   | file`MIME Type` |

#### event

| Name    | Parameters | Description                              |
|---------|------------|------------------------------------------|
| `ready` | `()`       | Triggered when the component is rendered |

#### Example

![Preview](docs-images/unknown-viewer.webp)

```vue

<template>
  <unknown-viewer src="https://disk.sample.cat/samples/pdf/sample-a4.pdf" filename="Sample A4 PDF"
                  mimeType="application/pdf" class="pangju-wh-100"/>
</template>

<script setup>
  import {UnknownViewer} from "@pangju/file-viewer";
</script>
```

### ErrorViewer

`错误`Preview component, used to display errors that occur during file preview

#### property

| Properties | Type     | Default Value | Description                |
|------------|----------|---------------|----------------------------|
| `reason`   | `string` | `"文件预览失败"`    | Error reason (for display) |
| `filename` | `string` | `undefined`   | File name                  |
| `src`      | `string` | `undefined`   | file`URL`                  |
| `mimeType` | `string` | `undefined`   | file`MIME Type`            |

#### Example

![Preview](docs-images/error-viewer.webp)

```vue

<template>
  <error-viewer src="https://disk.sample.cat/samples/pdf/sample-a4.pdf" filename="Sample A4 PDF"
                mimeType="application/pdf" class="pangju-wh-100"/>
</template>

<script setup>
  import {ErrorViewer} from "@pangju/file-viewer";
</script>
```

## 📄 Open source protocol

[Apache 2.0 License](LICENSE)
