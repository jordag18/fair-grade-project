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

# Install Cloud SQL Proxy
ADD https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 /cloud_sql_proxy
RUN chmod +x /cloud_sql_proxy

# Run Prisma generate
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Ensure the application runs on port 3000
EXPOSE 3000

# Start both the Cloud SQL Proxy and the application
CMD /cloud_sql_proxy -instances=YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID=tcp:3306 & npm start
