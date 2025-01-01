
# Backend_Koinx

This repository contains the backend implementation for **Koinx**, built using Node.js, Express, and MongoDB. The backend provides RESTful APIs for managing users, products, and transactions in the system.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow the steps below to set up the project locally:

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/Tkundlas/Backend_Koinx.git
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd Backend_Koinx
   \`\`\`

3. Install the required dependencies:

   \`\`\`bash
   npm install
   \`\`\`

4. Set up environment variables:

   Create a `.env` file in the root of the project and add the necessary environment variables:

   \`\`\`bash
   MONGODB_URI=<your-mongo-db-connection-string>
   PORT=<your-port>
   JWT_SECRET=<your-jwt-secret>
   \`\`\`

5. Start the server:

   \`\`\`bash
   npm start
   \`\`\`

   The server should now be running on `http://localhost:<your-port>`.

## Features

- **User Authentication:** Register, login, and token-based authentication using JWT.
- **Product Management:** Add, update, delete, and fetch product details.
- **Transaction Management:** Handle user transactions and track payment history.
- **Secure Routes:** Protect certain routes that require authentication.

## API Endpoints

Here is a brief overview of the API endpoints:

### User

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: User login and token generation.
- `GET /api/users/me`: Get logged-in user's profile (protected route).

### Product

- `GET /api/products`: Get all products.
- `POST /api/products`: Create a new product (admin access).
- `PUT /api/products/:id`: Update a product (admin access).
- `DELETE /api/products/:id`: Delete a product (admin access).

### Transaction

- `POST /api/transactions`: Create a new transaction.
- `GET /api/transactions/user/:userId`: Get transactions for a specific user.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **dotenv** for environment management

## Project Structure

\`\`\`bash
Backend_Koinx/
├── config/          # Configuration files (e.g., db connection)
├── controllers/     # Logic for handling requests
├── models/          # Mongoose schemas and models
├── routes/          # API route definitions
├── middleware/      # Custom middleware (e.g., authentication)
├── .env             # Environment variables
├── app.js           # Entry point of the application
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
\`\`\`

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
