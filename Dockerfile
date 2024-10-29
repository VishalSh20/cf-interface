# Use the official Node.js image
FROM node:20

# Install necessary packages for Chrome
RUN apt-get update && \
    apt-get install -y wget \
                       unzip \
                       curl \
                       gnupg2 \
                       && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
                       && sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
                       && apt-get update \
                       && apt-get install -y google-chrome-stable \
                       && apt-get clean \
                       && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the application port
ENV PORT=4000
EXPOSE $PORT

# Command to run your app
CMD ["npm", "run", "start"]
