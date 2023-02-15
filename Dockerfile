FROM node:16

# Create app directory
WORKDIR /app

# Copy package.json files
COPY package.json .

# Install the dependencies
RUN npm install

# Copy all scripts files
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.ts"]
