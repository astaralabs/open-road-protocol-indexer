#!/bin/bash

echo "$DEPLOY_ENV"

if [[ "$DEPLOY_ENV" == "beta" ]]; then
    echo "Installing PostgreSQL client..."
    apt-get update && apt-get install -y postgresql-client

    echo "Resetting database..."
    psql $POSTGRES_SCHEMA -c "DROP DATABASE beta_orp WITH (FORCE);"
    psql $POSTGRES_SCHEMA -c "CREATE DATABASE beta_orp;"
    echo "Db reset successfully"
    
else 
    echo "Not in beta env"
fi

echo "Starting application..."
exec "$@"