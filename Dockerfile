# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Accept build arguments and set environment variables
ARG DB_INSTANCE_CONNECTION_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG AUTH_SECRET
ARG AUTH_TRUST_HOST
ARG AUTH_GITHUB_ID
ARG AUTH_GITHUB_SECRET

ENV DB_INSTANCE_CONNECTION_NAME=$DB_INSTANCE_CONNECTION_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV AUTH_GITHUB_ID=$AUTH_GITHUB_ID
ENV AUTH_GITHUB_SECRET=$AUTH_GITHUB_SECRET

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
