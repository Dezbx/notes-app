#!/bin/bash

echo "================================"
echo "   Starting Notes App"
echo "================================"

# Check Java
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed. Please install Java 17."
    exit 1
fi

# Check Node
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js."
    exit 1
fi

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo "ERROR: MySQL is not installed. Please install MySQL 8."
    exit 1
fi

# Create database if not exists
echo "Setting up database..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS notesdb;" 2>/dev/null

# Start backend
echo "Starting backend..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
echo "Backend started with PID $BACKEND_PID"

# Wait for backend to be ready
echo "Waiting for backend to start..."
sleep 15

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!
echo "Frontend started with PID $FRONTEND_PID"

echo ""
echo "================================"
echo "   App is running!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo "================================"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait and handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait