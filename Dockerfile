# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema file
COPY prisma ./prisma

# Copy the rest of the application code to the working directory
COPY . .

# Run Prisma generate
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Ensure the application runs on port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
