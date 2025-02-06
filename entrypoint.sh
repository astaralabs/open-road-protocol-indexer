#!/bin/bash
set -e

# Check if Ponder is already running
EXISTING_TASKS=$(aws ecs list-tasks --cluster orp-cluster --service-name orp-service-beta | jq -r '.taskArns | length')

if [ "$EXISTING_TASKS" -eq 0 ]; then
    echo "Starting Ponder in primary mode..."
    ponder start
else
    echo "Starting Ponder in secondary mode..."
    ponder serve
fi
