# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the application's port
EXPOSE 3009

# Start the application
CMD ["npm", "start"]