# Use Node.js image with Alpine Linux
FROM node:20-alpine3.19

# Set the working directory inside the container
WORKDIR /src

# Install the latest npm version globally and then copy package files
RUN npm install -g npm@latest

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your application
CMD ["npm", "run","dev"]
