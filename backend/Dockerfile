
FROM node:16.13.1-alpine3.13 
# Set the working directory to /app inside the container
WORKDIR /usr/app
# Copy app files
COPY ./ ./
COPY package*.json ./
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN apk add krb5-dev 
RUN apk add --no-cache python3 make g++
RUN npm install 

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV development
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]