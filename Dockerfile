# 第一阶段：构建前端
FROM node:20.20 AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 拷贝项目文件
COPY . .

# 构建
RUN npm run build

# 第二阶段：Nginx部署
FROM nginx:alpine

# 删除默认配置
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建结果（注意路径）
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
