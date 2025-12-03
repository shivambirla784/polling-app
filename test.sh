#!/bin/bash
echo "Running Backend Tests..."
cd backend
npm test
echo "Backend Tests Completed."

echo "Running Frontend Tests..."
cd ../frontend
# CI=true ensures Jest runs once and exits instead of watching
CI=true npm test
echo "Frontend Tests Completed."
