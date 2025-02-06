#!/bin/bash
set -e

echo "Attempting to start Ponder..."

if npx ponder start; then
    echo "Ponder started successfully."
else
    echo "Ponder start failed. Running 'npx ponder serve' instead..."
    npx ponder serve
fi