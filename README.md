# Express JWT Authentication and MongoDB Connection

This project demonstrates how to implement JWT authentication in an Express.js application and how to connect to MongoDB using Mongoose.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
    cd <project-directory>

3. Install dependencies:
    npm install

4. Create a .env file in the root directory and add the following environment variables:
    MONGODB_URL=<your-mongodb-url>
    JWT_PASSWORD=<your-jwt-password>
    PORT=<port-number>

5. To start the Express server, run:
    npm start

### Endpoints

1. POST /signup
    Creates a new user account.
    Request Body:
    {
    "name": "John Doe",
    "username": "johndoe",
    "password": "password"
    }

2. POST /login
    Authenticates a user and returns a JWT token.
    Request Body:
    {
    "username": "johndoe",
    "password": "password"
    }

3. GET /users
    Fetches all users except the authenticated user.Requires JWT token in the Authorization header.

4. DELETE /remove-user
    Deletes the authenticated user. JWT token in the Authorization header.

### Libraries used
    * Express.js
    * JWT (JSON Web Tokens) for authentication
    * Mongoose for MongoDB integration





