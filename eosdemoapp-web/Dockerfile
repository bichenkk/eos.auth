# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:carbon-alpine

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Set all environment variable
ARG API_URL
ENV API_URL=${API_URL}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Copy all local files into the image.
COPY . .

# Build for production.
RUN NODE_ENV=development yarn
RUN npm run build
RUN rm -rf .git
RUN rm -rf node_modules
RUN rm -rf src
RUN rm -rf public

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve --single -p 7000 dist

# Tell Docker about the port we'll run on.
EXPOSE 7000