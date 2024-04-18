# Use node:18-alpine image for smaller size
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project directory
COPY . .

# Expose port (replace 3000 with your actual port)
EXPOSE 3000

# Start the application (replace "npm start" with your actual start command)
CMD [ "npm", "start" ]
