# Installation

```bash
npm init
npm install express dotenv mongoose bcryptjs jsonwebtoken cookie-parser express-async-handler concurrently
npm install -D nodemon
# Create frontend
npm create vite@latest frontend
```

## Create a `.env` file in the root of the project and add the following

```bash
PORT=5000
MONGO_URI=your mongodb uri
JWT_SECRET=your jwt secret
```

## Add the following scripts to the `package.json` file

```json
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "cd frontend && npm run dev",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

## Frontend setup

```bash
cd frontend
npm i react-bootstrap react-icons bootstrap react-router-dom react-router-bootstrap
npm i @reduxjs/toolkit react-redux
```
