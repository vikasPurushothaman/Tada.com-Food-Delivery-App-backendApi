# Tada.com Food Delivery App Backend API

This is the backend API for the Tada Food Delivery App, designed to handle all operations related to food delivery, users, orders, and more. The API is built using **Node.js** and **Express**.

## Features

- User Authentication and Authorization
- CRUD Operations for managing food items and orders
- Payment Integration
- Admin Dashboard for managing users and orders
- Support for managing customer data and orders in real-time

## Technologies Used

- **Node.js**: Backend server environment
- **Express**: Web framework for building the API
- **MongoDB**: Database for storing user data, orders, and food items
- **JWT (JSON Web Tokens)**: For user authentication and authorization
- **Mongoose**: ODM (Object Data Modeling) for MongoDB
- **Bcrypt**: For hashing passwords securely
- **Dotenv**: For environment variables management

## API Endpoints

### User Routes

#### POST /api/users/register
- Registers a new user
- **Request body**:
    - `username`: string
    - `email`: string
    - `password`: string

#### POST /api/users/login
- Logs in an existing user
- **Request body**:
    - `email`: string
    - `password`: string

### Food Routes

#### GET /api/foods
- Retrieves a list of all available food items

#### POST /api/foods
- Adds a new food item to the menu (Admin only)
- **Request body**:
    - `name`: string
    - `price`: number
    - `category`: string
    - `image`: string

### Order Routes

#### POST /api/orders
- Places a new order
- **Request body**:
    - `userId`: string
    - `foodItems`: Array of objects `{ foodId: string, quantity: number }`

#### GET /api/orders/:userId
- Retrieves all orders for a specific user

## Setup

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vikasPurushothaman/Tada.com-Food-Delivery-App-backendApi.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Tada.com-Food-Delivery-App-backendApi
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file and add your environment variables:
    ```bash
    PORT=5000
    MONGO_URI=mongodb://your_mongo_connection
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server:
    ```bash
    npm start
    ```

### Testing the API

You can use tools like **Postman** or **Insomnia** to test the endpoints.

---

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or bug fixes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Example

Here's an example of how you might use the API to register a new user:

```bash
POST /api/users/register

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
