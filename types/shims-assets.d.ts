// 声明所有静态资源模块导出 string（Vite/Webpack 默认行为）
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg";

declare module "*.dxf";
declare module "*.glb";
declare module "*.gltf";
declare module "*.stl";
declare module "*.obj";

declare module "*.md";
declare module "*.txt";
declare module "*.json5";

declare module "*.mp3";
declare module "*.mp4";
declare module "*.wav";
declare module "*.ogg";

declare module "*.pdf";

declare module "*.doc";
declare module "*.docx";
declare module "*.xls";
declare module "*.xlsx";
declare module "*.ppt";
declare module "*.pptx";

// 通用兜底：所有未声明的静态资源都返回 string
declare module "*";
