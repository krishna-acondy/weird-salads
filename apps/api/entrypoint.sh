#!/bin/sh

cd /app/apps/api
# Run database migrations
yarn migrate

# Start the application
node dist/index.js