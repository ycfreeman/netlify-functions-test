FROM node:11.14.0-alpine
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --prod
COPY . .
EXPOSE 80
CMD ["node", "build/server.js"]
