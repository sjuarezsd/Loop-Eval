# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    sudo \
    git \
    curl \
    wget \
    unzip \
    xvfb \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2

# Install Playwright and its dependencies
RUN npm install -g playwright

# Install TypeScript
RUN npm install -g typescript

# Install VS Code Remote Development dependencies
RUN apt-get install -y openssh-client less iproute2 procps

# Add user for vscode remote development
RUN useradd -ms /bin/bash vscode
USER vscode

# Set up the environment
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Expose the app port
EXPOSE 3000

# Start the container with a shell by default
CMD ["bash"]
