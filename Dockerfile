# Stage 1: Build the Nuxt app
FROM node:16-alpine AS builder
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:16-alpine
WORKDIR /app
# Copy the built app from the builder stage
COPY --from=builder /app .
# Expose the port Nuxt will run on
EXPOSE 5173
# Start the Nuxt application
CMD ["npm", "start"]
