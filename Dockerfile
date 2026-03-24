# 第一阶段：构建前端
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:20.20.0 AS builder

WORKDIR /app

ARG VITE_ONLY_OFFICE_ID="only-office-editor"
ARG VITE_ONLY_OFFICE_TOKEN=""
ARG VITE_ONLY_OFFICE_SERVER_URL=""
ARG VITE_OFFICE_VIEWER_MODE="microsoft"
ARG VITE_OFFICE_VIEWER_LANGUAGE="zh"
ARG VITE_OFFICE_VIEWER_REGION="zh-CN"
ARG VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL="https://view.officeapps.live.com/op/embed.aspx"
ARG VITE_PDF_VIEWER_MODE="pdfjs"
ARG VITE_PDF_VIEWER_LANGUAGE="zh"
ARG VITE_PDF_VIEWER_REGION="zh-CN"
ARG VITE_PDF_VIEWER_PDFJS_VIEW_BASE_URL="pdfjs/web/viewer.html"


# 安装依赖
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com

# 拷贝项目文件
COPY . .

# 构建
RUN VITE_ONLY_OFFICE_ID=${VITE_ONLY_OFFICE_ID} \
    VITE_ONLY_OFFICE_TOKEN=${VITE_OONLY_OFFICE_TOKEN} \
    VITE_ONLY_OFFICE_SERVER_URL=${VITE_OONLY_OFFICE_SERVER_URL} \
    VITE_OFFICE_VIEWER_MODE=${VITE_OFFICE_VIEWER_MODE} \
    VITE_OFFICE_VIEWER_LANGUAGE=${VITE_OFFICE_VIEWER_LANGUAGE} \
    VITE_OFFICE_VIEWER_REGION=${VITE_OFFICE_VIEWER_REGION} \
    VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL=${VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL} \
    VITE_PDF_VIEWER_MODE=${VITE_PDF_VIEWER_MODE} \
    VITE_PDF_VIEWER_LANGUAGE=${VITE_PDF_VIEWER_LANGUAGE} \
    VITE_PDF_VIEWER_REGION=${VITE_PDF_VIEWER_REGION} \
    VITE_PDF_VIEWER_PDFJS_VIEW_BASE_URL=${VITE_PDF_VIEWER_PDFJS_VIEW_BASE_URL} \
    npm run build

# 第二阶段：Nginx部署
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:stable-alpine

# 删除默认配置
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建结果（注意路径）
COPY --from=builder /app/dist /usr/share/nginx/html

RUN sed -i '/index  index.html index.htm;/a \        try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
