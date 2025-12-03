#!/bin/bash
echo "Installing Backend Dependencies..."
cd backend
npm install
echo "Backend Dependencies Installed."

echo "Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "Frontend Dependencies Installed."

echo "Installation Complete."
