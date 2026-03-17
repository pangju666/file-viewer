FROM nginx:stable-alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 从构建阶段复制 dist 目录
# 注意：Vite/Vue CLI 默认输出目录通常是 dist
COPY --from=builder /app/dist/app .

# (可选) 复制 Nginx 配置文件以支持 History 模式
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]