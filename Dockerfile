# Stage 1: Build the Nuxt app
FROM node:20-alpine AS builder
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
COPY .env.testing ./.env
RUN npm install
# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app
# Copy the built app from the builder stage
COPY --from=builder /app .
# Expose the port Nuxt will run on
EXPOSE 5173
# Start the Nuxt application
CMD ["node", ".output/server/index.mjs"]