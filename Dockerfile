# Stage 1: Build ứng dụng React (SỬ DỤNG NPM)
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json VÀ package-lock.json
COPY package.json package-lock.json ./

# Cài đặt dependencies bằng "npm ci"
# "npm ci" (Clean Install) nhanh và an toàn hơn cho Docker
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
RUN npm run build

# Stage 2: Serve ứng dụng bằng Nginx
FROM nginx:alpine

# Copy kết quả build từ stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx (giữ nguyên như hướng dẫn trước)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]