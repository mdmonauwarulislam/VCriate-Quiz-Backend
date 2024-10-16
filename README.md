
---

# Backend API - Authentication and Quizzes

## Overview

This is a Node.js backend that provides functionalities for user authentication (Register, Login, Logout) and quiz management (Create, View, Take Quizzes, View Results). It is built using Express.js and MongoDB, with JWT (JSON Web Tokens) used for authentication.

## Features

### User Authentication

- **User Registration**: Users can create a new account.
- **User Login**: Users can log into their accounts.
- **User Logout**: Users can log out, invalidating their session.

### Quiz Management

- **Create Quizzes**: Admins can create new quizzes.
- **View Quizzes**: Users can view all available quizzes.
- **Take Quizzes**: Users can participate in quizzes.
- **View Results**: Users can view their quiz results.

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing user and quiz data
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB and Node.js
- **JWT (JSON Web Tokens)** - For user authentication
- **Bcryptjs** - For password hashing

## Project Structure

```bash
.
├── config/             # Configuration files (e.g., database, environment)
├── controllers/        # Request handling logic for auth and quizzes
├── models/             # Mongoose models (User, Quiz)
├── routes/             # API routes (auth, quizzes)
├── middlewares/        # Middleware for JWT authentication and validation
├── constant/           # httpsStatusCode 
├── .env                # Environment variables (not included in repo)
└── index.js              # Main entry point
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mdmonauwarulislam/VCriate-Quiz-Backend.git
```

2. Navigate to the project directory:

```bash
cd vcriate-quiz-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Set up your environment variables in a `.env` file in the root directory:

```bash
# .env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

5. Start the development server:

```bash
npm start
```

## API Endpoints

### User Authentication

| HTTP Method | Endpoint                      | Description                        |
|-------------|-------------------------------|------------------------------------|
| POST        | /api/auth/register            | Register a new user                |
| POST        | /api/auth/login               | Login user                         |
| POST        | /api/auth/logout              | Logout user                        |

### Quiz Management

| HTTP Method | Endpoint                              | Description                        |
|-------------|---------------------------------------|------------------------------------|
| GET         | /api/quizzes                          | Get all quizzes                    |
| POST        | /api/quizzes                          | Create a new quiz                  |
| GET         | /api/quizzes/:id                      | Get a specific quiz                |
| POST        | /api/quizzes/submit                   | Submit a quiz answer               |

## Deployment

### Steps to Deploy on Vercel

1. **Install Vercel CLI** (optional):
   If you prefer to deploy via the command line, you can install the Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   After installing the CLI, log in to Vercel:

   ```bash
   vercel login
   ```

3. **Connect Your Project**:
   Push your local project to a GitHub repository. Then, go to the [Vercel dashboard](https://vercel.com/dashboard), click on "Add New Project", and import your GitHub repository.

4. **Configure Environment Variables**:
   After importing the project, Vercel will prompt you to configure your environment variables. Add the following environment variables:

   - `PORT=8000` 
   - `MONGO_URI=<your-mongo-uri>`
   - `JWT_SECRET=<your-jwt-secret>`

5. **Select a Framework Preset**:
   Choose **Node.js** as the framework for the project.

6. **Deploy the Project**:
   Once everything is set up, click "Deploy". Vercel will build and deploy your backend project.

7. **Post-Deployment**:
   After deployment, you will receive a live URL where your backend is hosted (e.g., `https://vcriate-quiz.vercel.app/`). Use this URL to make API requests.

### Deploying via Command Line (optional)

If you prefer to deploy directly from your terminal, follow these steps:

1. Inside your project folder, run the following command:

```bash
vercel
```

2. Follow the prompts to set up your project, and Vercel will handle the deployment process.

## Running Tests

To run tests (if you have added any):

```bash
npm run test
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
