FROM node:16.19.0-alpine

#ENV NODE_OPTIONS=--openssl-legacy-provider

# Install yarn
RUN apk add --no-cache yarn git alpine-sdk

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package*.json /app

# Copy the rest of the application code
COPY . /app

# Stupid npm fails if it finds previous builds
RUN rm -f /app/public/styles/style-*.css

RUN yarn add node-sass

# Install the dependencies
RUN yarn install

# Build the application
RUN yarn build

# Expose the application's port
EXPOSE 8888

# Start the application
CMD ["yarn", "dev"]
