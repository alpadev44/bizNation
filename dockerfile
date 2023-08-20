# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the wait-for-it script and give it execute permissions
COPY wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh

# Copy the rest of the application to the working directory
COPY . .
