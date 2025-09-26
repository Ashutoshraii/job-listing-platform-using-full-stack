# job-listing-platform-using-full-stack
A foundational, full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack to function as a simple Job Listings Board. This project demonstrates core competencies in building a dynamic Single Page Application (SPA) with a robust RESTful API and complete CRUD (Create, Read, Update, Delete) functionality.
To run the project:
Backend setup:
# 1. Create and move into the backend directory
mkdir job-backend
cd job-backend

# 2. Initialize and install dependencies
npm init -y
npm install express mongoose mongodb cors

# 3. Create the server.js file and paste the backend code.

# 4. Start the server (runs on http://localhost:4000)
node server.js

Frontend setup:
# 1. Create and move into the client directory
npx create-react-app job-client
cd job-client

# 2. Replace src/App.js and create src/App.css with the provided files.

# 3. Start the React app (runs on http://localhost:3000)
npm start
