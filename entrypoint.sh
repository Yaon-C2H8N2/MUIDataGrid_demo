#!/bin/sh

cd /app/client
if [ ! -d "node_modules" ]; then
  # If it doesn't exist, install dependencies
  echo "Installing dependencies..."
  bun install --frozen-lockfile
else
  # If it exists, run the application
  echo "Dependencies already installed. Starting the application..."
fi

bun run dev