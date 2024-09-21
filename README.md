# Backend - Task Management Application

This is the **backend** for the Task Management Application. It manages user authentication, project and task management, team collaboration, and email notifications. The backend is built using **NestJS**, with **MongoDB** for the database and **Swagger** for API documentation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Prerequisites

Before setting up, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or using MongoDB Atlas)
- [npm](https://www.npmjs.com/get-npm) (or yarn)

## Installation

### 1. Clone the Repository

To begin, clone the repository from GitHub:

```bash
git clone https://github.com/simbrella-task-manager-bd/backend.git
```

### 2. Navigate to the Backend Directory
Move into the backend directory:

```bash
cd simbrella-task-manager-bd
```

### 3. Install Dependencies
Install all necessary packages by running:

If you are using npm:

```bash
Copy code
npm install
```
If you prefer Yarn:

```bash
Copy code
yarn install
```

### 4. Set Up Environment Variables
Locate the .envExample file in the project root directory and rename it with ".env" 

### Running the Application

Run the Backend Server
Start the server in development mode:

```bash
Copy code
npm run start:dev
```
If using Yarn:

```bash
Copy code
yarn start:dev
```
By default, the application will run on http://localhost:4000.

### API Documentation
The API is documented using Swagger. To view the API documentation, visit:

```bash
Copy code
http://localhost:4000/api/docs
You can explore and interact with the available endpoints directly from the Swagger UI.
```

### Project Structure

```bash
backend/
│
├── src/
│   ├── auth/              # Handles user authentication (register, login)
│   ├── project/           # Handles project-related logic
│   ├── task/              # Handles task-related logic
│   ├── team/              # Manages teams and team assignments
│   ├── common/            # Shared utilities, guards, etc.
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── test/                  # Test files
├── .env                   # Environment variables
├── nest-cli.json          # NestJS CLI configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```
### Testing
To ensure everything is working as expected, you can run the tests:

Unit tests:

```bash
Copy code
npm run test
```
