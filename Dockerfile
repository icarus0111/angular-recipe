# A node.js v8 box
FROM node:latest
 
# Who(m) to blame if nothing works
MAINTAINER ojo@sigmastudioz.com
 
# Create a working directory 
RUN mkdir -p /usr/src/app
 
# Switch to working directory
WORKDIR /usr/src/app
 
# Copy contents of local folder to `WORKDIR`
# You can pick individual files based on your need
COPY . .

# Install yarn globally
RUN npm install yarn -g
 
# Install pm2 globally
RUN yarn global add pm2
 
# Install dependencies (if any) in package.json
RUN yarn install

# Build project
RUN yarn build
 
# Expose port from container so host can access $PORT
EXPOSE $PORT
 
# Start the Node.js app on load
CMD [ "yarn", "start" ]