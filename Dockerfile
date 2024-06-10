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

# Set build-time environment variables
ARG DB_INSTANCE_CONNECTION_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME

# Set environment variables in the container
ENV DB_INSTANCE_CONNECTION_NAME=$DB_INSTANCE_CONNECTION_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME

# Set environment variable for Google Cloud credentials
ENV GOOGLE_APPLICATION_CREDENTIALS=/secrets/credentials.json

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
