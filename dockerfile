# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory
WORKDIR /usr/src/app

# Copy the application code
COPY . .

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

# Install TypeScript
RUN npm install -g typescript

# Install Playwright and its dependencies
RUN npm install --save-dev @types/node
RUN npx playwright install
RUN npx playwright install-deps
RUN npm install --save-dev @playwright/test

# Install VS Code Remote Development dependencies
RUN apt-get install -y openssh-client less iproute2 procps

# Set user to root (for further development in container)
# USER root

# Set up the environment
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Start container, run tests and output html test results report
CMD ["npx", "playwright", "test", "--reporter=html"]
