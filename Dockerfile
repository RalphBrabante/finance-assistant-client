# Stage 1: Build Angular app
FROM node:18 AS build

WORKDIR /finance-assistant-client
COPY package*.json ./
RUN npm install --force
COPY . .
RUN  npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx's default public folder
COPY --from=build /finance-assistant-client/dist/finance-assistant-client/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]