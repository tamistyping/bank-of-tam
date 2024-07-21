# BankOfTam: Full-Stack Banking Application

## Overview

**BankOfTam** is a full-stack banking application designed to manage bank accounts and users efficiently. It features a Spring Boot backend for server-side operations and a React frontend for the user interface. The application connects to a MySQL database, providing various banking functionalities and user management features.

## Features

### Backend (Spring Boot)

- **User Management:**
  - Retrieve a user by ID.
  - Create, update, and delete users.
  - Find users by username.
  - Retrieve all users.

- **Bank Account Management:**
  - Retrieve a bank account by account number.
  - Deposit, withdraw, and transfer funds between accounts.
  - Get the balance of a bank account.
  - Retrieve all bank accounts.

### Frontend (React)

- **User Interface:**
  - Interactive UI for managing users and bank accounts.
  - Forms for creating and updating users and accounts.
  - Visualizations for account balances and transactions.

## API Endpoints

The RESTful API exposes endpoints for CRUD operations on users and bank accounts:

### User Endpoints

- **Retrieve All Users**
  - `GET /users`
  - Retrieves a list of all users.

- **Retrieve User by ID**
  - `GET /users/{id}`
  - Retrieves a user by their ID.

- **Retrieve User by Username**
  - `GET /users/username/{username}`
  - Retrieves a user by their username. Returns `404 Not Found` if the user does not exist.

- **Create User**
  - `POST /users`
  - Creates a new user. Requires a JSON body with user details.

- **Update User**
  - `PUT /users/{id}`
  - Updates an existing user's details by ID. Requires a JSON body with updated user details.

- **Delete User**
  - `DELETE /users/{id}`
  - Deletes a user by their ID.

- **Delete All Users**
  - `DELETE /users/deleteAll`
  - Deletes all users from the database.

### Bank Account Endpoints

- **Get Account Balance**
  - `GET /bank-accounts/balance/{accountNumber}`
  - Retrieves the balance of a bank account by account number. Returns `400 Bad Request` for invalid account numbers and `404 Not Found` if the account does not exist.

- **Transfer Money**
  - `POST /bank-accounts/transfer`
  - Transfers funds between two bank accounts. Requires query parameters: `from` (source account number), `to` (destination account number), and `amount` (amount to transfer).

- **Deposit Funds**
  - `PUT /bank-accounts/{accountNumber}/deposit`
  - Deposits funds into a bank account. Requires a query parameter `amount` (amount to deposit).

- **Withdraw Funds**
  - `PUT /bank-accounts/{accountNumber}/withdraw`
  - Withdraws funds from a bank account. Requires a query parameter `amount` (amount to withdraw).

## Enhancements and Future Improvements

1. **Enhanced Authentication and Security:**
   - Implement JWT (JSON Web Tokens) for secure authentication.
   - Integrate OAuth2 for third-party authentication.

2. **File Storage Integration:**
   - Utilize Amazon S3 for storing and managing user profile pictures.
   - Enable functionality for uploading, updating, and deleting profile images.

3. **Additional Features:**
   - Implement user activity logging.
   - Add two-factor authentication (2FA) for enhanced security.
   - Provide detailed transaction history and user feedback mechanisms.

4. **UI/UX Improvements:**
   - Implement Swagger/OpenAPI for API documentation and testing.

