#!/bin/bash
echo "Starting Backend..."
cd backend
# Start backend in background
npm start &
BACKEND_PID=$!

echo "Starting Frontend..."
cd ../frontend
# Start frontend in background
npm start &
FRONTEND_PID=$!

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
