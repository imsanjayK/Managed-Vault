# Step 1: Build the Angular application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Copy the built Angular files from the build step
COPY --from=build /app/dist/vault /usr/share/nginx/html

# Expose port 80 to access the app in the browser
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]