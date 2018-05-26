#!/bin/bash
# Start all services

# Start Backend stack (in detached mode)
docker-compose up -d

# Start Frontend
cd frontend
yarn run dev
