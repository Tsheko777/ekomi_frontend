# Use an official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Install the serve package to serve the build folder
RUN npm install -g serve

# Expose port 5000 for the app to run
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
