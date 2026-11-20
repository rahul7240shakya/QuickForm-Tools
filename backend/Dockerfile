
# Use Node.js base image
FROM node:22-bookworm-slim

# Install Ghostscript for PDF compression
RUN apt-get update && apt-get install -y --no-install-recommends ghostscript \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy backend source code
COPY . .

# Create required folders
RUN mkdir -p uploads processed compressed

# Start backend server
CMD ["npm", "start"]
